const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const contentSchema = new mongoose.Schema({
    "contentType": {
        required: true,
        enum: ["text", "image"]
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
    },
    "title": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
    },
    "content1": contentSchema,
    "content2": contentSchema,
    "content3": contentSchema,
    "content4": contentSchema,
});

const Portfolio = mongoose.model("portfolio", portfolioSchema);

function validatePortfolio(portfolio) {     // with Joi

    let schema = Joi.object( {
        "portID": Joi.string().min(5).required(),
        "title": Joi.string().required(),
        "email": Joi.string(),
        "content1": {
            "contentType": Joi.string().required(),
            "text": Joi.string(),
            "imageName": Joi.string(),
            "emURL": Joi.string()
        },
        "content2": {
            "contentType": Joi.string().required(),
            "text": Joi.string(),
            "imageName": Joi.string(),
            "emURL": Joi.string()
        },
        "content3": {
            "contentType": Joi.string().required(),
            "text": Joi.string(),
            "imageName": Joi.string(),
            "emURL": Joi.string()
        },
        "content4": {
            "contentType": Joi.string().required(),
            "text": Joi.string(),
            "imageName": Joi.string(),
            "emURL": Joi.string()
        }
    });
    
    return schema.validate(portfolio);
    }  
    
module.exports.Portfolio = Portfolio;
module.exports.validate = validatePortfolio;