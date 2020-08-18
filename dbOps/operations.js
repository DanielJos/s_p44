const mongoose = require("mongoose");
const {Portfolio:Portfolio,validatePortfolio:portValidate} = require("../models/portfolioSchemas.js");
const _ = require("lodash");
const debug = require("debug")("p44:debug"); 


async function createPortfolio(body) {  
  debug("=-=-=-=-=-=-=-=-=-=Beginning Create Portfolio=-=-=-=-=-=-=-=-=-=-=-");

  const portfolio = new Portfolio({
      portID: body.portID, 
      title: body.title,
      email: body.email,
      instagram: body.instagram,
      linkedin: body.linkedin,
      youtube: body.youtube,
      paypal: body.paypal,
      paragraph1: body.paragraph1
    }); 

    let error;

    try{
      const result = await portfolio.save();
      if(!result){
          debug("Error 400")
          error = new Error("Error 400");
      }
    }
    catch(err){
      debug(`Error message is: ${err.message}`)
      error = new Error(err.message);
    }

    return new Promise((resolve, reject)=>{
      if(!error){
        debug("=-=-=-=-=-=-=-=-=-=resolved=-=-=-=-=-=-=-=-=-=-=-");
        resolve(portfolio);
      }
      else{
        debug("=-=-=-=-=-=-=-=-=-=rejected=-=-=-=-=-=-=-=-=-=-=-");
        // debug("promise looks like:",error)
        reject(error);
        return;
      }
    });
  }
  
exports.createPortfolio = createPortfolio;
exports.Portfolio = Portfolio;