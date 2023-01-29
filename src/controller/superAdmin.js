

const courseModel = require('../model/adminModel')
const { isValidObjectId } = require('mongoose')

//===========================course approval by super admin ======================

const approveCourses = async function (req, res) {
try{
    
    const courseId = req.params.courseId
    if(!courseId){{return res.status(400).send({status:false , msg:"courseId please"})}}
    if(!isValidObjectId(courseId)){return res.status(400).send({status:false , msg:"invalid courseId"})}

    const coursesApproval = await courseModel.findOneAndUpdate({_id:courseId, isApproved:false},{$set:{isApproved:true}})

if(!coursesApproval){{return res.status(400).send({status:false , msg:"already approved !"})}}

return res.status(200).send({status:true , msg:"this course is successfully approved by the super admin"})

}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}
}

module.exports = {approveCourses}