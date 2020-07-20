const Joi = require("@hapi/joi");
const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    "username": {
        required: true,
        unique:true,
        type: String,
        minlength: 8,
        maxlength: 50        
    },
    "email": {
        required: true,
        unique:true,
        type: String,
        minlength: 5,
        maxlength: 255  
    },
    "password": {
        required: true,
        type: String,
        minlength: 8,
        maxlength: 1024  
    }
});

function validateUser(user) {     // with Joi

    const schema = Joi.object( {
        "username": Joi.string().min(8).max(50).required(),
        "email": Joi.string().required().min(5).max(255).email(),
        "password": Joi.string().min(8).max(255).required()      // orignally stored as plaintext, then hashed
    });
    
    return schema.validate(user);
}  

const User = mongoose.model("user", userSchema);

exports.User = User;
exports.validate = validateUser;