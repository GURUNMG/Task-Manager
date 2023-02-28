require('./db/mongoose')
const express=require('express');

const User=require('./models/user.js')
const Task=require('./models/task.js')

// router
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const port=process.env.PORT || 3001
app=express();
app.use(express.json())

// router use
app.use(userRouter)
app.use(taskRouter)






app.listen(port,()=>{
  console.log("Server running")
})
// npm run dev  ... to start server