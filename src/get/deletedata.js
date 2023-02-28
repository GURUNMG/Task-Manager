require('../db/mongoose')
const User = require('../models/User');

User.deleteOne({name:"Guru"}).then((result)=>{
 console.log("row deleted successfully")
}).catch((err)=>{
 console.log(err)
})