
const jwt = require('jsonwebtoken')
const employeeModel = require('../model/emplyeeModel')
const { isValidObjectId } = require('mongoose')
const courseModel = require('../model/adminModel')
const valid = require('validator')

//=======================resistration of employeee====================

const resister = async function (req , res){
    try{
    const data = req.body 

const {name , email , password} =data

if(!name){return res.status(400).send({status:false , msg:" provide your name "})}
if(!email){return res.status(400).send({status:false , msg:"provide your email "})}
if(!valid.isEmail(email)){return res.status(400).send({status:false , msg:"provide valid email"})}
if(!password){return res.status(400).send({status:false , msg:"provide your password "})}

const saveDetails = await employeeModel.create(data)
return res.status(201).send({status:true , data:saveDetails})
}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}

}
//===========================employee logIn====================

const logIn = async function (req , res) {
try{
    const data = req.body

    const {email , password} = data

    if(!email){return res.status(400).send({status:false , msg:"provide your email "})}

    if(!password){return res.status(400).send({status:false , msg:"provide your password "})}

    const check = await employeeModel.findOne({email:email , password:password}) 

 if(!check){return res.status(400).send({starus:false , msg: "Please Resister Yourself"})}
       
 const token = jwt.sign({employeeId:check._id},  "seceretekey")

 if(!token){ return res.status(400).send({status:false , msg:"There is something wrong"})

}

return res.status(201).send({status:false , data:token})    
}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}
}

// ====================== authentication========================

const auth = async function (req, res){
    try{
    const token = req.headers["x-api-key"]
    if(!token){res.status(400).send({status:false , msg:"token please"})}
    jwt.verify(token ,"seceretekey" ,function(err, decoded){
        if(err) {return res.status(401).send({status:false , msg:"invalid token"})}

        req.tokenDecoded = decoded

        next()
    })
    }catch(err){
        res.status(500).send({staus:false , msg: err.message})
    }
}



//========================= employee can fetch the book=================

const getCourses = async function(req ,res){
try{

    const courseId = req.params.courseId
    if(!courseId){{return res.status(400).send({status:false , msg:"courseId please"})}}
if(!isValidObjectId(courseId)){return res.status(400).send({status:false , msg:"invalid courseId"})}

const courses = await courseModel.find({_id:courseId,isApproved:true})
return res.status(200).send({staus:true , msg:courses})

}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}
}
module.exports = {resister, logIn,auth, getCourses}



