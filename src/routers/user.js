const express=require('express')
const router=new express.Router()
const User=require('../models/user')

// create a new task
router.post('/users', async (req,res) => {
  //  console.log(req.body)
  //  res.send("testing")
  
   const user =new User(req.body);
    
    try{
      await user.save();
      res.status(200).send(user);
    }catch(err){
      res.status(400).send(err);
    }
  
    // user.save().then(() => {
    // res.status(201).send(user)
    // }).catch((err) =>{
    //   // console.log(err)
    //   res.status(400).send("falied inserting")
    // })
  })
  
  //  view all tasks
  router.get('/users', async(req, res)=>{
  
    try{
      const user = await User.find({})
      res.status(200).send(user);
    } catch{
      res.send(500).send("SERVER DOWN");
    }
    // User.find({}).then((user)=>{
    //   res.send(user)
    // }).catch((user)=>{
    //   res.send("Server down")
    // })
  })
  
  // view a specific task
  router.get('/users/:id', async(req,res)=>{
    // console.log(req.params.id);
    const id=req.params.id;
  
    try{
      const user= await User.findById(id);
      if(!user)  return res.status(500).send("server down")
      res.status(200).send(user);
    }
    catch{
      res.status(400).send("Not found")
    }
    // User.findById(id).then((user)=>{
    //   if(!user)
    //   {
    //     return res.status(404).send("server down")
    //   }
    //   res.status(201).send(user) //user found
  
    // }).catch((err)=>{
    //   res.send("user not found in the registered database")
    // })
  })
  
  // update the specific user
   router.patch('/users/:id', async (req,res)=>{
    // const user=new User(req.body)
    const updates=Object.keys(req.body)
    const allowedupdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=>{
      return allowedupdates.includes(update)
    })
    if(!isValidOperation)
    {
      return res.status(400).send("Invalid update for the given fields")
    }
    try{

      const user=await User.findById(req.params.id);
      updates.forEach((update)=>{
        user[update]=req.body[update]
      })
      await user.save()
      // const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
      if(!user) return res.send("ERROR")
        res.status(200).send(user)
    }catch(e){
      res.status(400).send(e)
    }
  })
  
  // delete a specific user
  router.delete('/user/:id',async(req, res)=>{
    const id=req.params.id;
  
    try{
      const user=await User.findByIdAndDelete(id)
  
      if(!user) return res.status(400).send("user not found")
      res.status(200).send("user deleted")
    } catch{
      res.status(500).send("server error")
    }
  })

module.exports = router;