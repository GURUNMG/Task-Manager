const mongoose= require('mongoose');
const validator = require('validator');
const bcryt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
  name:{ 
   type:String,
   required:true,
   trim:true
  },
  email:{
   type:String,
   unique:true,
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
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
 })


//  token generation
 userSchema.methods.generateToken= async function(){
  const user= this;
  const token=jwt.sign({_id:user._id.toString()}, "this is guru")

  user.tokens=user.tokens.concat({token})
  await user.save()
  return token;
 }

 userSchema.statics.findEmail = async(email,password)=>{
  const user=await User.findOne({email})

  if(!user)
  {
    throw  new Error("unable to login");
  }
  const isMatch= await bcryt.compare(password, user.password)

  if(!isMatch) throw new Error("wrong password");
  return user;
 }



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