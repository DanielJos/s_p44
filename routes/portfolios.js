const debug = require("debug")("p44:debug");    // debugging
const mongoose = require("mongoose");
const express = require("express");
const {Portfolio, validate} = require("../models/portfolioSchemas.js");
const router = express.Router();
const pug = require("pug");

router.use(express.json());        // parses all requests in to json objects
router.use(express.static("./stylesheets"));
router.use(express.static("./user_images"));        // will this send all the files to the site? TODO

router.get("/", async (req, res)=>{
    res.render("index", {});
});

router.get("/:pID", async (req, res)=>{
    try{                                        // TODO: need to consider validation
        const portfolio = await Portfolio.findOne({
            portID: req.params.pID
        });
        if(!portfolio){
            res.status(404).send("404: PAGE NOT FOUND");
            debug("404: PAGE NOT FOUND");
        }
        else{
            console.log(portfolio)
            res.render("index", { 
                title: portfolio.title,
                email: portfolio.email,
                content1:portfolio.content1,
                content2:portfolio.content2,
                content3:portfolio.content3,
                content4:portfolio.content4

            } );
            debug(`Rendered: ${portfolio.portID}`)
        }
    }
    catch(err){
        debug(err.errors);
        res.status(404);
    }
});

// post a portfolio from body
router.post("/", async (req, res)=>{

    // validate the req.body against the schema
    debug(req.body);
        try{
            const result = validate(req.body);
            console.log(result);
            if(!result){
                debug(`Joi was not obtained (Joi validation error): ${result}`);
                return res.send("Invalid Entry");
            }
        }
        catch(err){
            debug(err.message);
        }
        
        // bail is error
        // if(result.error){
        //     return res.status(400).send(result.error);
        // }

        // "let" because we want to return the ID property when it has saved
        let portfolio = new Portfolio({     // when adding more properties remember both schema
            portID: req.body.portID,
            title: req.body.title,
            email: req.body.email,
            content1: {
                contentType: req.body.content1.contentType,
                text: req.body.content1.text,
                imageName: req.body.content1.imageName,     // TODO this doesnt make sense for working with images, but we can work it out.
                emURL: req.body.content1.emURL
            },
            content2: {
                contentType: req.body.content2.contentType,
                text: req.body.content2.text,
                imageName: req.body.content2.imageName,     // TODO this doesnt make sense for working with images, but we can work it out.
                emURL: req.body.content2.emURL
            },
            content3: {
                contentType: req.body.content3.contentType,
                text: req.body.content3.text,
                imageName: req.body.content3.imageName,     // TODO this doesnt make sense for working with images, but we can work it out.
                emURL: req.body.content3.emURL
            },
            content4: {
                contentType: req.body.content4.contentType,
                text: req.body.content4.text,
                imageName: req.body.content4.imageName,     // TODO this doesnt make sense for working with images, but we can work it out.
                emURL: req.body.content4.emURL
            }
        })
        try{
            portfolio = await portfolio.save();
            if(!portfolio){
                res.status(400).send("Bad Request");
                return;
            }
        }
        catch(err){
            res.status(400).send("Bad Request");
            debug(`Error message is: ${err.message}`)
            return;
        }
        res.send(portfolio);
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