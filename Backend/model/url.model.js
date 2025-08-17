const mongoose = require('mongoose')
const urlschema = new mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true
    },
    originalUrl:{
        type:String,
        required:true
    },
})
module.exports=mongoose.model('Url',urlschema)