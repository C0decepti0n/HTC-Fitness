
import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ReminderCard = ()=>{
// set state to store reminders
const [ reminders, setReminders] = useState([]);

// set new reminders 
const[newReminders, setNewReminders] = useState({
  title: '',
  description: '',
  date: ''

});


//mounts fetched reminders 
useEffect(()=>{
  getReminders();
}, [])

//axios get request 
const getReminders = ()=>{
axios.get('/reminders')
.then((response)=>{
setReminders(response.data)
})
.catch((err)=>{
  console.error("Can not get all reminders:", err)
})
}


//axios Post
 const postReminders = () =>{
axios.post('/reminders'),{
  title: newReminders.title,
  description: newReminders.description,
  date: newReminders.date
}
.then(()=>{

  setReminders([...reminders, response.data])
  setNewReminders({
    title: '',
    description: '',
    date: ''
  
  })
})
.catch((err)=>{
console.error("Can not create reminder:", err)
})
 }


// axios request to update
const updateReminder = (id, updatedReminder) =>{
axios.patch(`/reminders/${id}`, updatedReminder)
.then(()=>{
  getReminders();
})
.catch((err)=>{
  console.error(err)

})
}


// axios DELETE reminder
const deleteReminder = (id) =>{
axios.delete(`/reminders/${id}`)
.then(()=>{
  getReminders();
})
.catch((err)=>{
  console.error(err)

})
}

return (
  <div>
    <h2>Reminders</h2>
  <div>
{reminders.map((reminder)=> {
<div></div>
})}

  </div>
  </div>
)

}
export default ReminderCard;