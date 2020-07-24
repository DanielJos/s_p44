const debug = require("debug")("p44:debug");    // debugging
const mongoose = require("mongoose");
const express = require("express");
const {Portfolio,Content, validatePortfolio: validatePortfolio, validateContent: validateContent } = require("../models/portfolioSchemas.js");
const router = express.Router();
const pug = require("pug");
const {createPortfolio, addContent} = require("../dbOps/operations.js");

router.use(express.json());
router.use(express.static("./stylesheets"));
router.use(express.static("./user_images"));        // will this send all the files to the site? TODO

router.get("/", async (req, res)=>{
    res.render("welcome");
    return;
});

router.get("/:pID", async (req, res)=>{
    //if(!req.params.pID == "NULL")
        try{                                        // TODO: need to consider validation
            const portfolio = await Portfolio.findOne({portID: req.params.pID});
            console.log(portfolio);
            if(!portfolio){
                res.status(404).send("404: PAGE NOT FOUND");
                debug("404: PAGE NOT FOUND");
                return;
            }
            else{
                res.render("index", { 
                    title: portfolio.title,
                    email: portfolio.email,
                    content: portfolio.content
                } );
                debug(`Rendered: ${portfolio.portID}`)
                return;
            }
        }
        catch(err){
            debug(err.errors);
            res.status(404);
            return;
        }
});

// post a portfolio from body
router.post("/", async (req, res)=>{
    debug("=-=-=-=-=-=-=-=-=-=Post Portfolio Req=-=-=-=-=-=-=-=-=-=-=-");
        try{
            const result = validatePortfolio(req.body);
            if(!result){
                debug(`Joi was not obtained (Joi validation error): ${result}`);
                return res.send("Invalid Entry").status(400);
            }
        }
        catch(err){
            debug(err.message);
        }

        const port = await createPortfolio(req.body.portID, req.body.title, req.body.email, new Content({
            contentType: req.body.content.contentType,
            text: req.body.content.text,
            imageName: req.body.content.imageName,   
            emURL: req.body.content.emURL})
        );
        if(!port){
            res.status(400).send("Bad Request: 400");
            return;
        }
        res.send(port);
});

// push content block
router.post("/:pID", async (req, res)=>{
    debug("=-=-=-=-=-=-=-=-=-=Add Content Req=-=-=-=-=-=-=-=-=-=-=-");

    let answer = await addContent(req.params.pID, req.body);
    if(answer.error){
        res.status(400).send(answer.error.details.message);
        console.log(answer.error.details.message);
        return;
    }
    else{
        res.status(200).send(`Successfully added content block to ${req.params.pID}'s Portfolio`);
        return;
    }
    
});

// find a portfolio, validate and then add the addition
// router.put("/:portID", async (req, res)=>{

//     // validate the req body
//     const result = validate(req.body)

//       // bail if error
//       if(result.error){
//           return res.status(400).send(error.details[0].message);
//       }

//     // query first
//     const portfolio = await Portfolio.find( {portID: portID} );
//     // if portfolio doesnt exist
//     if(!portfolio) return res.status(404).send("404");
//     portfolio.set({
//         portID: req.body.portID
//     });
//     portfolio = await portfolio.save();
//     debug(result);
// });

// router.delete("/:portID", async (req, res)=>{

//     // find portfolio
//     const portfolio = await Portfolio.find( {portID: portID} );
//     if(!portfolio) return res.status(404).send("No Portfolio to Delete...");

//     // delete the portfolio
//     const result = await Portfolio.deleteOne( {portID: portID} );
//     res.send(result + portfolio);

// });



module.exports = router;