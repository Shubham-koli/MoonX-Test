const CryptoJS = require('crypto-js');
const SHA256 = require('crypto-js/sha256');

const KEY = 'MoonX';



let getId = (uid) => {

    return new Promise((resolve, reject) => {
        try {
            let hash = SHA256(uid).toString(CryptoJS.enc.Hex);
            let id = {};
            id.id1 = hash.substr(0, 31);
            id.id2 = hash.substr(31, 63);
            resolve(id);
        } catch (err) {
            console.log(err);
            reject('error while hashing');
        }
    })
}
// getId('shubham').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

let encrypt_promise = (str, key) => {
    return new Promise((resolve, reject) => {
        if (str === null || str === undefined) {
            reject("String is not acceptable");
        } else if (key === null || key === undefined) {
            reject("key is not acceptable");
        } else {
            if (typeof (key) === 'string') {
                let text = CryptoJS.AES.encrypt(str, key).toString();
                resolve(text);
            } else {
                reject('key is not in string format');
            }
        }
    })
}

// encrypt_promise('shubham', KEY).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })






module.exports = {
    getId,
    encrypt_promise
}