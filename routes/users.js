const debug = require("debug")("p44:debug");    // debugging
const mongoose = require("mongoose");
const express = require("express");
const {User, validate} = require("../models/usersSchemas.js");
const router = express.Router();
const pug = require("pug");
const _ = require("lodash");
const ops = require("../dbOps/operations.js");

router.use(express.json());        // parses all requests in to json objects
router.use(express.static("./stylesheets"));

router.post("/", async (req, res)=>{
    try{
        const result = validate(req.body);
        if(!result){
            debug("here"); 
            return res.status(400).send("bad req");
    }
    }
    catch{
        debug(err.message);
    }
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(400).send("User Already Registered");

        user = await ops.createUser(req.body.email, req.body.username, req.body.password);
       
        res.send(user);
});


module.exports = router;