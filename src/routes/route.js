const express = require('express')
const router = express.Router()

const empContro = require('../controller/employeeContro')
const courseContro = require('../controller/adminContro')
const superContro = require('../controller/superAdmin')


// ==== employeee

router.post("/register", empContro.resister)
router.post("/logIn", empContro.logIn)
router.get("/courses/:courseId" , empContro.auth,empContro.getCourses)

//======admin

router.post('/course' , courseContro.courseCreate )

router.put('/course/:courseId' , courseContro.updateCourses )

router.delete('/course/:courseId' , courseContro.deleteCourse )
 
//======================superAdmin 

router.put("/approval/:courseId", superContro.approveCourses)

module.exports = router

