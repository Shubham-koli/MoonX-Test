//Importing library for 2FA modules
const speakeasy = require('speakeasy');

let secretToken = 'KF5C6YSPOVXEU4L3JQVFWLZTH5ATMSC5';

//This module takes 2FA code given by user is correct or not.
let verification = secret => {
    return new Promise((resolve, reject) => {
        let verified = speakeasy.totp.verify({
            secret: secretToken,
            encoding: 'base32',
            token: secret
        });
        if (verified)
            resolve(1);
        else
            reject(0);
    });
}

// verification('755023').then(result => {
//     if (result)
//         console.log('2FA code Matched.');

// }).catch(err => {
//     console.log('2FA code Failed to Match.');
//     console.log(err);
// })
module.exports = {
    verification
}