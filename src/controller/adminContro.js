


const { isValidObjectId } = require('mongoose')
const courseModel = require('../model/adminModel')
//==================course created by admin ==============================
const courseCreate = async function(req, res){
try{
    const courseData = req.body 
    if(Object.keys(courseData).length == 0){return res.status(400).send({status:false , msg: "provide some input"})}
    const {title , description , videoUrl , topic , duration, category} = courseData
if(!title || !description || !videoUrl || !topic || !duration || !category )
{return res.status(400).send ({status: false , msg: "something is missing"})}

const saveData = await courseModel.create(courseData) 
return res.status(201).send({status: true , data:saveData})

}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}
}



//==============================update course by admin=================

const updateCourses = async function (req, res){
    try{
    const courseId = req.params.courseId
const courseData = req.body 
if(Object.keys(courseData).length == 0){return res.status(400).send({status:false , msg: "provide some input"})}
const {title , description , videoUrl , topic , duration, category} = courseData

const update = await courseModel.findByIdAndUpdate({_id:courseId},{$set:{title:title,
     description:description , videoUrl:videoUrl, duration:duration,category:category},
    $push:{topic:topic}},{new:true})

return res.status(200).send({status:true , data:update})
}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}
}





//=====================delete course by admin====================
 
const deleteCourse = async function (req, res){
try{
    const courseId = req.params.courseId

    if(!isValidObjectId(courseId)){return res.status(400).send({status:false , msg: "provide valid course id"})}

await courseModel.findOneAndDelete({_id:courseId})

res.status(200).send({status:true , msg:"successfully deleted"})
}catch(err){
    res.status(500).send({staus:false , msg: err.message})
}
}


module.exports = {courseCreate , updateCourses , deleteCourse}