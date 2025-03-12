
import React, {useState} from 'react';
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



//axios get request 
const getReminders = ()=>{

}
//axios Post
 const postReminders = () =>{

 }


// axios request to update
const updateReminder = () =>{

}


// axios DELETE reminder
const deleteReminder = () =>{

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