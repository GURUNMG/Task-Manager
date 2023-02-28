require('../db/mongoose')
const express=require('express');
const User=require('../models/user.js')

const port=process.env.PORT || 3001
app=express();

app.use(express.json())

app.post('/users',(req,res) => {
//  console.log(req.body)
//  res.send("testing")

 const user =new User(req.body);

 user.save().then(() => {
  res.send(user)
  }).catch((err) =>{
    console.log(err)
  })
})

app.get('/users',(req,res)=>{
 User.find({name:"Guru"}).then((user)=>{
  res.send(user)
 }).catch((err)=>{
  res.send("error")
 })
})

app.get('/users/:name',(req,res)=>{
 const user_name=req.params.name
 User.find({name:user_name}).then((user)=>{
  res.send(user)
 }).catch((err)=>{
  res.send("error");
})
})

app.patch('/users/:name',(req,res)=>{
  const update_age=req.body.age
  const needed=req.params.name
  User.updateOne({name:needed},{age:update_age}).then((result)=>{
   res.send(result)
    return User.count({age:update_age}).then((result1)=>{
     console.log("Count...",result1)
    }).catch((error)=>{
     console.log("Error")
    })
   })
})

app.delete('/users',(req,res)=>{
  const dlt_row=req.body.name;
  User.deleteOne({name:dlt_row}).then((result)=>{
    return res.send(result)
  }).catch((error)=>{
    console.log("Error")
  })
})

app.listen(port,()=>{
  console.log("Server running")

})