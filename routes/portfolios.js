const debug = require("debug")("p44:debug");    // debugging
const Joi = require('@hapi/joi');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const pug = require("pug");

router.use(express.json());        // parses all requests in to json objects
router.use(express.static("./stylesheets"))

// define the DB's portfolio schema
const portfolioSchema = new mongoose.Schema({
    "portID": {
        type: String,
        required: true,
        minlength: 5,
        lowercase: true,
    },
    "title": {
        type: String,
        required: true
    }

});

// Joi req.body schema (for validation)
function validatePortfolio(portfolio) {     // with Joi

const schema = Joi.object( {
    "portID": Joi.string().min(5).required(),
    "title": Joi.string().required()
});
console.log(schema.validate(portfolio));

return schema.validate(portfolio);
}  

// define a new model           // collection, schema
const Portfolio = mongoose.model("portfolio", portfolioSchema);

router.get("/", async (req, res)=>{
    
    // get the portfolio (await promise)
    res.render("index", {username: "Testo"});
});

// get a portfolio according to the end of the url
router.get("/:pID", async (req, res)=>{
    try{                                        // TODO: need to consider validation
    // get the portfolio (await promise)
    const portfolio = await Portfolio.findOne({
        portID: req.params.pID
    });
    
    if(!portfolio){
        res.status(404).send("404: PAGE NOT FOUND");
        debug("404: PAGE NOT FOUND");
    }
    else{
        res.render("index", {username: portfolio.title, email: "email@outlook.com"} );
        debug(`Rendered: ${portfolio.portID}`)
    }

    
    }
    catch(err){
        console.log(err.errors);
        res.status(404);
    }
});

// post a portfolio from body
router.post("/", async (req, res)=>{

    // validate the req.body against the schema
    debug(req.body);
        try{
            const result = validatePortfolio(req.body);
        }
        catch(err){
            console.log(err.message);
        }
        // bail is error
        // if(result.error){
        //     return res.status(400).send(result.error);
        // }

        // "let" because we want to return the ID property when it has saved
        let portfolio = new Portfolio({     // when adding more properties remember both schema
            portID: req.body.portID,
            title: req.body.title
        })
        portfolio = await portfolio.save();

        res.send(portfolio);
});

// find a portfolio, validate and then add the addition
router.put("/:portID", async (req, res)=>{

    // validate the req body
    const result = portfolioSchema.validate(req.body)

      // bail if error
      if(result.error){
          return res.status(400).send(error.details[0].message);
      }

    // query first
    const portfolio = await Portfolio.find( {portID: portID} );
    // if portfolio doesnt exist
    if(!portfolio) return res.status(404).send("404");
    portfolio.set({
        portID: req.body.portID
    });
    portfolio = await portfolio.save();
    debug(result);
});

router.delete("/:portID", async (req, res)=>{

    // find portfolio
    const portfolio = await Portfolio.find( {portID: portID} );
    if(!portfolio) return res.status(404).send("No Portfolio to Delete...");

    // delete the portfolio
    const result = await Portfolio.deleteOne( {portID: portID} );
    res.send(result + portfolio);

});



module.exports = router;