"use strict";
//importing 3rd party libraries
const express = require("express");
const bodyParser = require("body-parser");

// initializing sample user for first time.
const init = require('./init');

// importing self created modules

//importing modules for 2fa verification
const {
    verification
} = require('./2FA/verification');

//importing module for decrypting private keys.
const {
    getPrivateKey
} = require('./cryptography/decryption/decrypt');


var app = express();
app.use(bodyParser.json());


app.post('/getkeys', (req, response) => {
    console.log(req.body);
    verification(req.body.Token).then(res => {
        getPrivateKey(req.body.uid, req.body.pwd).then(pKey => {
            console.log(pKey);
            if (pKey == '') {
                response.send('Incorrect userName or Password');
            } else {
                response.send({
                    privateKey: pKey
                })
            }
        })
    }).catch(err => {
        console.log('Invalid 2FA code');
        response.sendStatus(403);
    })
})

app.listen(3000, () => {
    console.log("Started on port 3000");
});