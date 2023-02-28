require('./db/mongoose')
const express=require('express');

const User=require('./models/user.js')
const Task=require('./models/task.js')

const port=process.env.PORT || 3001
app=express();
app.use(express.json())

app.post('/users', async (req,res) => {
//  console.log(req.body)
//  res.send("testing")

 const user =new User(req.body);
  
  // try{
  //   await user.save()
  //   res.statue(200).send(user)
  // }catch(e){
  //   res.status(400).send(e)
  // }

 user.save().then(() => {
  res.status(201).send(user)
  }).catch((err) =>{
    // console.log(err)
    res.status(400).send("falied inserting")
  })
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

app.get('/users',(req, res)=>{
  User.find({}).then((user)=>{
    res.send(user)
  }).catch((user)=>{
    res.send("Server down")
  })
})

app.get('/users/:id', (req,res)=>{
  // console.log(req.params.id);
  const id=req.params.id;

  User.findById(id).then((user)=>{
    if(!user)
    {
      return res.status(404).send("server down")
    }
    res.status(201).send(user) //user found

  }).catch((err)=>{
    res.send("user not found in the registered database")
  })
})

app.post('/tasks',(req,res)=>{
  const task= new Task(req.body);
  console.log(req.body)
  
  task.save().then(()=>{
    res.status(201).send("Data Inserted",task);
  }).catch((err)=>{
    res.status(400).send("Failed")
  })
})


app.get('/tasks',(req,res)=>{
  Task.find({}).then((task)=>{
      res.status(200).send(task);
  }).catch((err)=>{
    res.send("Fetching failed")
  })
})

app.get('/tasks/:id', (req, res)=>{
  const id=req.params.id;

  Task.findById(id).then((task)=>{
    if(!task)
    {
      return res.status(500).send("SERVER DOWN")
    }
    res.status(201).send(task);
  }).catch((err)=>{
    res.status(400).send("FAILED")
  })
})



app.listen(port,()=>{
  console.log("Server running")

})