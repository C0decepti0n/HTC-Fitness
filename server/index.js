/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const remindersRouter = require('./routes/reminders'); 
const { User } = require('./db');


// const { Reminder } = require('./db');




//update routes
const routinesRouter = require('./routes/Routine.js');


dotenv.config({
  path: path.resolve(__dirname, '../.env'),

});

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '../dist/client');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/HTC-Fitness')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(express.static(DIST_DIR));

// Session middleware
app.use(session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport for google
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  callbackURL: `${process.env.GOOGLE_CALLBACK_URL}` || 'http://localhost:3000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if User profile exists in DB
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // If not, make a new one
      user = new User({
        googleId: profile.id,
        nameFirst: profile.name.givenName,
        nameLast: profile.name.familyName,
        email: profile.emails[0].value,
        goal_weight: 0,
        weights: [],
        saved_exercises: [],
      });
      await user.save();
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// Get the current user's profile
app.get('/me', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/',
}));

// Check auth
app.get('/api/check-auth', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

// Logout Route
app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

app.use('/api/exercises', exercisesRouter);
app.use('/api/users', usersRouter);

app.use('/api/reminders', remindersRouter);

app.use('/api/routines', routinesRouter);

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.info(`Server listening at http://127.0.0.1:${PORT}`);
});
