const pug = require("pug");
const express = require("express");
const app = express.Router();
 

const page = pug.renderFile(__dirname + "/index.pug", {
    username: "Test"
});

module.exports = page;