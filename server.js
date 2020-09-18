process.env.NODE_TLS_REFECT_UNAUTHORIZED = "0";
var env = process.env.NODE_ENV || 'development';

const config = require("./config/config")[env];

const express = require("express"),
    app = express(),
    port = config.api_port;

app.listen(port);
console.log("API server started on: " + port);