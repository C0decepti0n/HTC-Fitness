import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer, 
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import MoonIcon  from '@mui/icons-material/BedtimeOutlined';
import AlertIcon  from '@mui/icons-material/AddAlert'; 
import FitnessIcon  from '@mui/icons-material/FitnessCenter';
import TipsIcon  from '@mui/icons-material/TipsAndUpdates';
// import DrawerLeft from './DrawerLeft'

// import { styled } from '@mui/material/styles';
import axios from 'axios';

const drawerWidth = 240;

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&: hover fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
    },
  },
});


const NavBar = ({ setIsAuthenticated }) => {
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isRoutines = location.pathname === '/routines';
  const [open, setOpen] = useState(false);


  const handleSearch = () => {
    console.log('Searching for', searchInput);
    setSearchInput('');
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    axios.post('/logout')
      .then(() => {
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  };
  // const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  //   ({ theme }) => ({
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //     transition: theme.transitions.create('margin', {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     marginLeft: `-${drawerWidth}px`,
  //     variants: [
  //       {
  //         props: ({ open }) => open,
  //         style: {
  //           transition: theme.transitions.create('margin', {
  //             easing: theme.transitions.easing.easeOut,
  //             duration: theme.transitions.duration.enteringScreen,
  //           }),
  //           marginLeft: 0,
  //         },
  //       },
  //     ],
  //   }),
  // );

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const theme = useTheme();
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}> 
    <AppBar position="flex" sx={{ backgroundColor: '#1A237E' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          HTC Fitness 
          </Typography>
          {/* Render search bar only on routines page */}
          {isRoutines && (
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
              <CustomTextField
                variant="outlined"
                placeholder="Exercises..."
                size="small"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                onKeyDown={handleEnter}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                color="white"
                sx={{ ml: 1, height: '40px', backgroundColor: '#0D1C61' }}
                >
                Search
              </Button>
            </Box>
          )}
         
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={'profile'} disablePadding>
             {/* // TODO link route  */}
            <ListItemButton>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'tips'} disablePadding>
            {/* // TODO link route  */}
            <ListItemButton>
              <ListItemIcon>
                <TipsIcon />
              </ListItemIcon>
              <ListItemText primary={'Tips'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'reminders'} disablePadding>
            {/* // TODO link route  */}
            <ListItemButton>
              <ListItemIcon>
                <AlertIcon />
              </ListItemIcon>
              <ListItemText primary={'Reminders'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'routines'} disablePadding>
            <ListItemButton component={Link} to="/routines">
              <ListItemIcon>
                <FitnessIcon />
              </ListItemIcon>
              <ListItemText primary={'Routines'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'goals'} disablePadding>
            <ListItemButton component={Link} to="/goals">
              <ListItemIcon>
                {/* // TODO change icon  */}
                <FitnessIcon />
              </ListItemIcon>
              <ListItemText primary={'Goals'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'sleep-tracker'} disablePadding>
            {/* // TODO link route  */}
            <ListItemButton>
              <ListItemIcon>
                <MoonIcon />
              </ListItemIcon>
              <ListItemText primary={'Sleep Tracker'} />
            </ListItemButton>
          </ListItem> 
        </List>
        <Divider />
        <List>
        <ListItem key={'logout'} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                {/* // TODO change icon  */}
                <MoonIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
</Box>
  );
};

export default NavBar;
