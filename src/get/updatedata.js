require('../db/mongoose')
const express=require('express');
const User=require('../models/user.js')

const port=process.env.PORT || 3001
app=express();

app.use(express.json())


User.updateOne({name:"Bharath"},{age:18}).then((result)=>{
 console.log("Updated 1",result)
 return User.count({age:18}).then((result1)=>{
  console.log("Count...",result1)
 }).catch((error)=>{
  console.log("Error")
 })
})