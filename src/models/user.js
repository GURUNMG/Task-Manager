const mongoose= require('mongoose');
const validator = require('validator');
const bcryt=require('bcrypt')

const userSchema=new mongoose.Schema({
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

 userSchema.pre('save', async function(next){
  const user = this;
  
  if(user.isModified('password'))
  {
    user.password=await bcryt.hash(user.password, 6)
  }
  next();
 })
const User=mongoose.model('user',userSchema)

module.exports =User