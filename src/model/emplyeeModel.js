const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema ({

name:{
    type: String
},
email:{
    type:String
},
password:{
    type: String
},
role:{
    type:String,
    default:"Employee"
}
 
   })

   module.exports = mongoose.model('employee', employeeSchema)