const mongoose = require('mongoose');

const login_model = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"name is required"]
    },
    email:{
        type : String,
        required : [true,"name is required"]
    },
    password:{
        type : String,
        required : [true,"name is required"]
    },
    token:{
        type : String,
    }
})

const loginModel = mongoose.model('Login', login_model)
module.exports = loginModel;