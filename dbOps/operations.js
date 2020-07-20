const mongoose = require("mongoose");
const {Portfolio, Content, validate:portValidate, validateContent: validateContent} = require("../models/portfolioSchemas.js");
const {User, Uservalidate} = require("../models/usersSchemas.js");
const debug = require("debug")("p44:debug"); 

async function addContent(id, content){

    debug("Beginning add Content");
    debug(content);
    const portfolio = await Portfolio.findOne({portID: id});
    debug(portfolio.content);
    portfolio.content.push(content);
    
    result = portValidate(portfolio);
    if(result){
        portfolio.save();
        return;
    }
    else{
        console.log("Invalid:")
        return;
    }  
}
async function createPortfolio(portID, title, email, content) {  
  const portfolio = new Portfolio({
      portID, 
      title,
      email,
      content
    }); 
    try{
      const result = await portfolio.save();
      if(!result){
          debug("Error 400")
          return;
      }
    }
    catch(err){
      debug(`Error message is: ${err.message}`)
      return;
    }

    return portfolio;
  }
async function createUser(email, username, password){
  const user = new User({
    email, username, password
  });
  try{
    const result = await user.save();
    if(!result){
      debug("Error 400");
      return;
    }
  }
  catch(err){
    debug(err.message);
    return;
  }
  return user;
}
  

//addContent("5f0f1de351c3814a10232e11", new Content({contentType: "image", imageName: "dave_1.jpg"}));

exports.createPortfolio = createPortfolio;
exports.addContent = addContent;
exports.createUser = createUser;