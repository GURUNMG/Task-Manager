require('./db/mongoose')
const express=require('express');
const User=require('./models/user.js')
const port=process.env.PORT || 3001
app=express();

app.use(express.json())

app.post('/users', async (req,res) => {
//  console.log(req.body)
//  res.send("testing")

 const user =new User(req.body);
  
  try{
    await user.save()
    res.send(user)
  }catch(e){
    res.send(e)
  }
  

//  user.save().then(() => {
//   res.send(user)
//   }).catch((err) =>{
//     console.log(err)
//   })
})

app.patch('/users/:id', async (req,res)=>{
  // const user=new User(req.body)

  try{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
    
    if(!user) return res.send("ERROR")
    res.status(200).send(user)
  }catch(e){

    res.status(400).send(e)
  }
})
app.listen(port,()=>{
  console.log("Server running")

})