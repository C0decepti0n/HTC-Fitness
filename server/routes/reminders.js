const express = require('express');
const { Reminder } = require('../db/index');

const router = express.Router();

// GET: fetch all reminders in the database
router.get('/', (res, req)=>{
Reminder.find({})
.then((reminders)=>{
res.status(200).send(reminders)
})
.catch((err)=>{
console.error('Failure to find reminders:', err);
res.sendStatus(500)
})
})

