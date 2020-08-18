const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const portfolioSchema = new mongoose.Schema({
    "portID": {
        type: String,
        required: true,
        minlength: 5,
        lowercase: true,
        trim: true,
        unique: true
    },
    "title": {
        type: String,
        required: true,
        trim: true
    },
    "email": {
        type: String,
        required: true,
        trim: true
    },
    "instagram": {
        type: String,
        trim: true
    },
    "linkedin": {
        type: String,
        trim: true
    },
    "youtube": {
        type: String,
        trim: true
    },
    "paypal": {
        type: String,
        trim: true
    },
    "paragraph1":{
        type: String,
        maxlength: 480,
    }
});

const Portfolio = mongoose.model("portfolio", portfolioSchema);

function validatePortfolio(portfolio) {     // with Joi

    const schema = Joi.object( {
        "portID": Joi.string().min(5).required(),
        "title": Joi.string().required(),
        "email": Joi.string(),
        "instagram": Joi.string(),
        "linkedin": Joi.string(),
        "youtube": Joi.string(),
        "paypal": Joi.string(),
        "paragraph1": Joi.string(),
        "maxlength": Joi.string()
    });
    
    return schema.validate(portfolio);
}  

module.exports.Portfolio = Portfolio;
module.exports.validatePortfolio = validatePortfolio;
