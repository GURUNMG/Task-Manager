const mongoose= require('mongoose');
const validator = require('validator');

const Task=mongoose.model('tasks',
{
 task_name:{
  type:String,
  required:true,
  trim:true
  },
 completed:{
  type:Boolean,
  default:false
 }
})


module.exports = Task;