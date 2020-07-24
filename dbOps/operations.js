const mongoose = require("mongoose");
const {Portfolio, Content, validatePortfolio:portValidate, validateContent: validateContent} = require("../models/portfolioSchemas.js");
const {User, Uservalidate} = require("../models/usersSchemas.js");
const { result } = require("lodash");
const debug = require("debug")("p44:debug"); 

// validate and add content block (returns Joi schema.validate)
async function addContent(id, content){
    debug("=-=-=-=-=-=-=-=-=-=Beginning addContent=-=-=-=-=-=-=-=-=-=-=-");
    let portfolio = await Portfolio.findOne({portID: id});
    let result = validateContent(content);
    
    portfolio.content.push(content);
    
    if(!result.error){
        portfolio.save();
        debug(`saved ${portfolio.portID}'s content block`);
        return result;
    }
    else{
        return result;
    }  
}
async function createPortfolio(portID, title, email, content) {  
  debug("=-=-=-=-=-=-=-=-=-=Beginning Create Portfolio=-=-=-=-=-=-=-=-=-=-=-");
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
  debug("=-=-=-=-=-=-=-=-=-=Beginning createUser=-=-=-=-=-=-=-=-=-=-=-");
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
  
exports.createPortfolio = createPortfolio;
exports.addContent = addContent;
exports.createUser = createUser;
exports.User = User;
exports.Portfolio = Portfolio;
exports.Content = Content;