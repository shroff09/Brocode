const joi = require('joi');
const mongoose =  require('mongoose');

const user = mongoose.model('User', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:5,
        maxlength:30,
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:30,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:40,
    }
}));

function validateUser(user){
    const schema ={
        name: joi.string().min(5).max(30).required(),
        email: joi.string().min(5).max(30).required().email(),
        password: joi.string().min(5).max(40).required(),
    };
    return joi.validate(user,schema);
}
module.exports = { user }
exports.validate = validateUser;
