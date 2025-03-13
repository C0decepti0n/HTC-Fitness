const express = require('express');
const { Reminder } = require('../db/Reminder');

const router = express.Router();

// GET: fetch all reminders in the database
router.get('/:userId', (req, res)=>{
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
router.post('/', (req, res)=>{
  
  Reminder.create(req.body)
  .then(()=>{
    res.sendStatus(201)
  })
  .catch((err)=>{
    console.error('Failure to create reminder:', err)
    res.sendStatus(500);
  })
})



//UPDATE
router.patch('/:id', (req, res)=>{
  Reminder.findByIdAndUpdate(req.params.id, req.body)
  .then((updateReminder)=>{
    if(updateReminder){
      res.status(200).send(updateReminder)
    }else{
      res.sendStatus(404)
    }
  })
  .catch ((err)=>{
    console.error('Failure to update reminder:', err)
    res.sendStatus(500)
  })
})



//DELETE
router.delete('/:id', (req, res)=>{
  Reminder.findByIdAndDelete(req.params.id)
  .then((delReminder)=>{
    if(delReminder){
      res.sendStatus(200)
    }else{
      console.error("Failure to find reminder:")
      res.sendStatus(404)
    }
  
  })
  .catch ((err)=>{
    console.error('Failure to delete reminder:', err)
    res.sendStatus(500)
  })
})
module.exports = router;