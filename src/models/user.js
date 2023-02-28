const mongoose= require('mongoose');
const validator = require('validator');

const User=mongoose.model('user',{
 name:{ 
  type:String,
  required:true,
  trim:true
 },
 email:{
  type:String,
  required:true,
  trim:true,
  // lowercase:true,
  validate(value){
   if(! validator.isEmail(value))
   {
    throw new Error("Email is not valid..")
   }
  }
 },
 password:{
  type:String,
  required:true,
  trim:true,
  minlength:7,
  validate(value){
   if(value.toLowerCase().includes('password')){
    throw new Error("Try another password")
   }
  }
 },
 age:{
  type:Number,
  validate(value){
   if(value<0){
     throw new Error("Age must be in positive number..")
   }
  }
 }
})

module.exports =User