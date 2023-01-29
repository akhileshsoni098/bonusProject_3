

const mongoose = require('mongoose')


// title, description, video Url, topics array, duration, category,  

const adminSchema = mongoose.Schema({
    
title:String,
description:String,
videoUrl:String,
topic:{
    type:Array
},
duration:String,
category:String,

isApproved:{
   type:Boolean,
   default:false
}

})

module.exports = mongoose.model('admin' , adminSchema)