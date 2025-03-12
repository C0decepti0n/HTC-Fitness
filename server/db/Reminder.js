const mongoose = require ('mongoose');
//reminder schema
const reminderSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  }, 
  description: {
    type:String,
    required: true,
  },
    date:{
      type:Date,
      reuqired: true
    },
    completed:{
      type: Boolean
    },
    // createdAt:{
    // }, 
    
  
})