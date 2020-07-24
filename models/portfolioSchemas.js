const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const contentSchema = new mongoose.Schema({
    "contentType": {
        required: true,
        type: String,
        enum: ["text", "image", "embed"]
    },
    "text": {
        type: String,
        required: function(){return this.contentType === "text" }
    },
    "imageName": {
        type: String,
        required: function(){return this.contentType == "image" }
    },
    "emURL": {
        type: String,
        required: function(){return this.contentType == "embed" }
    }
});

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
    "content": [contentSchema]
});

const Portfolio = mongoose.model("portfolio", portfolioSchema);
const Content = mongoose.model("content", contentSchema);

function validatePortfolio(portfolio) {     // with Joi

    const schema = Joi.object( {
        "portID": Joi.string().min(5).required(),
        "title": Joi.string().required(),
        "email": Joi.string(),
        "content": {
            "contentType": Joi.array().required(),
            "text": Joi.string(),
            "imageName": Joi.string(),
            "emURL": Joi.string()
        }
    });
    
    return schema.validate(portfolio);
}  
function validateContent(content){

    const schema = Joi.object({
        "contentType": Joi.string().valid("text", "image", "embed").required(),
        "text": Joi.string(),
        "imageName": Joi.string(),
        "emURL": Joi.string()
    });
    //console.log(schema.validate(content));
    return schema.validate(content);
}    

module.exports.Portfolio = Portfolio;
module.exports.Content = Content;
module.exports.validate = validatePortfolio;
module.exports.validateContent = validateContent;