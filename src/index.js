require('./db/mongoose')
const express=require('express');

const User=require('./models/user.js')
const Task=require('./models/task.js')

const port=process.env.PORT || 3001
app=express();
app.use(express.json())

// create a new task
app.post('/users', async (req,res) => {
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
app.get('/users', async(req, res)=>{

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
app.get('/users/:id', async(req,res)=>{
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
 app.patch('/users/:id', async (req,res)=>{
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
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
    
    if(!user) return res.send("ERROR")
    res.status(200).send(user)
  }catch(e){

    res.status(400).send(e)
  }
})

// create a new task
app.post('/tasks',async(req,res)=>{
  const task= new Task(req.body);
  // console.log(req.body)
  try{
    await task.save()
    res.status(200).send(task)
  }catch{
    res.status(400).send('FAILED')
  }
  // task.save().then(()=>{
  //   res.status(201).send("Data Inserted",task);
  // }).catch((err)=>{
  //   res.status(400).send("Failed")
  // })
})

// view all tasks
app.get('/tasks',async (req,res)=>{

  try{
    const task=await Task.find({})
    res.status(200).send(task)  
  }catch{
    res.status(500).send("SERVER DOWN")
  }
  // Task.find({}).then((task)=>{
  //     res.status(200).send(task);
  // }).catch((err)=>{
  //   res.send("Fetching failed")
  // })
})

// specific task
app.get('/tasks/:id', async(req, res)=>{
  const id=req.params.id;

  try{
    const task=await Task.findById(id)
    if(!task) return res.status(500).send("SERVER DOWN ")

    res.status(200).send(task);
  } catch{
    res.status(400).send("Not found")
  } 
  // Task.findById(id).then((task)=>{
  //   if(!task)
  //   {
  //     return res.status(500).send("SERVER DOWN")
  //   }
  //   res.status(201).send(task);
  // }).catch((err)=>{
  //   res.status(400).send("FAILED")
  // })
})



app.listen(port,()=>{
  console.log("Server running")
})