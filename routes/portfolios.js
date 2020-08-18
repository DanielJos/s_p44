const debug = require("debug")("p44:debug");    // debugging
const mongoose = require("mongoose");
const express = require("express");
const {Portfolio,validatePortfolio: validatePortfolio} = require("../models/portfolioSchemas.js");
const router = express.Router();
const {createPortfolio, addPage} = require("../dbOps/operations.js");

router.use(express.json());
router.use(express.static("./stylesheets"));
router.use(express.static("./user_images"))
router.use(express.static("./views/js")); 
router.use(express.static("./views/icons"));

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
                // res.sendFile("index.html")]
                // res.sendFile("index.html", { root: "views"})

                const data = {
                    title: "pageName"
                };
                console.log(portfolio);
                res.render("index", {"portfolio": portfolio,});
                // res.send("Hey")
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
            if(result.error){
                debug(`Joi was not obtained (Joi validation error): ${result}`);
                return res.send("Invalid Entry").status(400);
            }
            const portf = await createPortfolio(req.body);

            res.send(portf);
            return;
        }
        catch(err){
            debug("Caught:",err.message);
            res.status(400).send("Bad Request: 400");
            return;
        }
        return;

        
});

// // push page block
// router.post("/:pID", async (req, res)=>{
//     debug("=-=-=-=-=-=-=-=-=-=Add Content Req=-=-=-=-=-=-=-=-=-=-=-");

//     let answer = await addPage(req.params.pID, req.body);
    
//     console.log(answer);
//     if(answer.error){
//         res.status(400).send("400: Bad Request");
//         console.log("400: Bad Request");
//         return;
//     }
//     else{
//         res.status(200).send(`Successfully added content block to ${req.params.pID}'s Portfolio`);
//         return;
//     }
    
// });

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