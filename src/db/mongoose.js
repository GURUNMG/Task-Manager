//CONNECTION FILE 
const mongoose=require('mongoose')
// const validator=require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
 useNewUrlParser:true
 })

// const User=mongoose.model('user',{
//  name:{ 
//   type:String,
//   require:true,
//   trim:true
//  },
//  email:{
//   type:String,
//   required:true,
//   trim:true,
//   lowercase:true,
//   validate(value){
//    if(! validator.isEmail(value))
//    {
//     throw new Error("Email is not valid..")
//    }
//   }
//  },
//  password:{
//   type:String,
//   required:true,
//   trim:true,
//   minlength:7,
//   validate(value){
//    if(value.toLowerCase().includes('password')){
//     throw new Error("Try another password")
//    }
//   }
//  },
//  age:{
//   type:Number,
//   validate(value){
//    if(value<0){
//      throw new Error("Age must be in positive number..")
//    }
//   }
//  }
// })

// const me=new User(
//  {
//   name:"GURUBHARAN",
//   email:"gurubharan@gmail.com",
//   password:"abcdefghijk",
//   age:18
//  })

// me.save().then(()=>{
//  console.log("Success",me)
// }).catch((error)=>{
//  console.log(error)
// })

// const Task=mongoose.model('tasks',
// {
//  task_name:{
//   type:String,
//   required:true,
//   trim:true
//   },
//  completed:{
//   type:Boolean,
//   default:false
//  }
// })

// const insert=new Task(
//   {
//     task_name:"CV project"
//   }
//     )

// insert.save().then(()=>{
//  console.log(insert)
// }).catch((error)=>{
//  console.log("Error",error)
// })