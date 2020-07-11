const express = require("express");
const app = express();
const debug = require("debug")("p44:debug");    // debugging
const morgan = require("morgan");       // http logging
const helmet = require("helmet");       // header security
const config = require("config");       // config files
const mongoose = require("mongoose");

const portfolios = require("./routes/portfolios");   // portfolio HTTP routes

app.use(helmet());
app.use("/", portfolios); // router
app.set("view engine", "pug");

debug(`Config File: ${config.get("name")}`);
debug(`NODE_ENV: ${process.env.NODE_ENV}\n`);
debug(`PORT: ${process.env.PORT}\n`);

port = process.env.PORT || 3000;


mongoose.connect(config.get("db.name"), {useNewUrlParser: true, useUnifiedTopology:true})
// mongoose.connect("")
    .then(()=>console.log(`Connected to: ${config.get("db.name")}`))
    .catch(err=>console.error("Can't Connect..."));

app.listen(port, ()=>{
    debug(`Listening on Port: ${port}`)
})