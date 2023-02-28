const express=require('express')
const router=express.Router()
const Task=require("../models/task")

// create a new task
router.post('/tasks',async(req,res)=>{
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
router.get('/tasks',async (req,res)=>{

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
router.get('/tasks/:id', async(req, res)=>{
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

// update the specific task
router.patch('/tasks/:id', async(req, res)=>{
  const updates=Object.keys(req.body)
  const allowedupdates=['task_name','completed']
  const isValidOperation=updates.every((update)=>{
    return allowedupdates.includes(update)
  })
  if(!isValidOperation)
  {
    return res.status(400).send("Invalid update for the given fields")
  }
  try{
    // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidator:true})
    
    const task=await Task.findById(req.params.id);
    updates.forEach((update)=>{
      task[update]=req.body[update];
    })
    await task.save()

    if(!task) return res.send("ERROR")
    res.status(200).send(task)
  }catch(e){
    res.status(400).send(e)
  }
})

// delete a specific user
router.delete('/task/:id',async(req, res)=>{
  const id=req.params.id;

  try{
    const task=await Task.findByIdAndDelete(id)

    if(!task) return res.status(400).send("task not found")
    res.status(200).send("task deleted")
  } catch{
    res.status(500).send("server error")
  }
})

module.exports = router;