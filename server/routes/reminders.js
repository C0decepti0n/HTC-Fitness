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


//POST: create new reminders
router.post('/', (res,req)=>{
  
  Reminder.create(req.body)
  .then(()=>{
    res.sendStatus(201)
  })
  .catch(()=>{
    console.error('Failure to create reminder:', err)
    res.sendStatus(500);
  })
})



//UPDATE
router.patch('/', (res,req)=>{
  Reminder.findByIdAndUpdate(req.params.id, req.body)
  .then(()=>{

  })
  .catch ((err)=>{
    console.error('Failure to update reminder:', err)
    res.sendStatus(500)
  })
})



