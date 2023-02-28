// C:/Users/HP/mongodb/bin/mongod.exe --dbpath=C:/Users/HP/mongodb-data

const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
// const ObjectId=mongodb.ObjectId

// const id= ObjectId()
// console.log(id.id)

const url="mongodb://127.0.0.1:27017"
const databaseName='task-manager'

MongoClient.connect(url,{useNewUrlParser:true}, (error,client)=>{
 if(error)
 {
  return console.log("Unable to connect to MongoDB")
 }

 console.log("Connected Successfully to MongoDB")

 const db=client.db(databaseName)

 //creatring a collection (C) CRUD
 // sing data insert..
 // db.collection('users').insertOne({name:"GURUBHARAN N M",age:19},(error, result) => {
 //   if(error) 
 //   {
 //    return console.log("Unable to insert user")
 //   }
 //   console.log(result)
 //  })

 // multiple data insert
 // db.collection('users').insertMany([
 //  {  name:"bharan", age:20 },
 //  { name:"Jack", age:30 },
 //  { name:"Jill", age:30 },
 // ],(error,result)=>{
 //  if(error) return console.log("Unable to insert collection into MongoDB")

 //  console.log(result)
 // })

 // db.collection('task').insertMany([
 //  {task_name:"Complete Assignments", status:"completed"},
 //  {task_name:"Project Submission", status:"not completed"},
 //  {task_name:"Cleaning Room", status:"completed"}
 // ],(error, result) => {
 //  if(error){return console.log("Unable to insert collection task")}

 //  console.log("Inserting collection task",result)
 // })

 //READING (R)CRUD

 // db.collection('task').findOne({task_name:'Cleaning Room'},(error, data) => {
 //  if(error){
 //   return console.log("Data is not available  please check once spelling")
 //  }
 //  console.log(data)

 //  db.collection('task').find({status:"completed"}).toArray((error,data)=>{
 //   if(error) 
 //   {
 //    return console.log("Data not found")
 //   }
 //   console.log(data)
 //  })

 //  db.collection('task').find({status:"completed"}).count((error,count)=>{
 //   if(error) 
 //   {
 //    return console.log("Data not found")
 //   }
 //   console.log(count)
 //  })
 // })

 // updating (U) CRUD

 // const updatePromise= db.collection('users').updateOne({
 //  _id:"62dcd7e0e001ee958818aa88"
 //     // name:"bharan"
 // },{
 //  $set:{
 //   name:"Raj Kumar"
 //  }
 //  //, inc increment the value by 1 ....
 //  // $inc:{
 //  //  age:1
 //  // }
 // })

 // updatePromise.then((result)=>{
 //  console.log("Update Successfull" +result)
 // }).catch((error)=>{
 //  console.log("Update failed: " + error)
 // })

 // const toUpdatemany=db.collection('task').updateMany({status:"not completed"},
 // {
 //  $set:{
 //   status:"completed`"
 //  }
 // })

 // toUpdatemany.then((result)=>{
 //  console.log("Update Sucess")
 // }).catch((error)=>{
 //  console.log("Update failed")
 // })

 // DELETE (D) CRUD deleting ...

 // db.collection('users').deleteOne({name:"GURUBHARAN N M"}).then((result)=>{
 //  console.log("Deleted...",result)
 // }).catch((error)=>{
 //  console.log("file not found")
 // })

 db.collection('users').deleteMany({age:30}).then((result)=>{
  console.log("Deleted")
 }).catch((error)=>{
  console.log("File not found")
 })

})


