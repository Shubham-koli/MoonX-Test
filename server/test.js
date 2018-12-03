"use strict";
// importing dotenv file


/*********************************************************************** */
// importing 3rd party libraries
// const express = require("express");
// const bodyParser = require("body-parser");
const speakeasy = require('speakeasy');
const qrcode = require('qrcode-terminal');

let secret = speakeasy.generateSecret({
    length: 20
});
console.log(secret.base32);
qrcode.generate(secret.otpauth_url);




// console.log(verified);