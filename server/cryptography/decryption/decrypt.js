const Crypto = require("crypto-js");

const {
    getKeyFromDB
} = require('../../MongoDB/keys');

const secretKey = 'MoonXEncryptionToken';

// module to string with given private key
let decrypt_promise = (str, key) => {
    return new Promise((resolve, reject) => {
        // validating the inputs
        if (str === null || str === undefined) {
            reject("String is not acceptable");
        } else if (key === null || key === undefined) {
            reject("key is not acceptable");
        } else {
            // actual decryption happening here.
            if (typeof key === "string") {
                let text = Crypto.AES.decrypt(str, key).toString(Crypto.enc.Utf8);
                resolve(text);
            } else {
                // reject if the key is not in valid format
                reject("key is not in string format");
            }
        }
    });
};

// aync function for the decrypting private key
let getPrivateKey = async (uid, pwd) => {
    try {
        // extracting the private key from monogDB
        let key = await getKeyFromDB(uid);
        console.log(key);
        return new Promise((resolve, reject) => {
            // decrypting the private key with the User's secret
            decrypt_promise(key, pwd).then(res => {
                // decrypting the private key with the MoonX platform secret key
                decrypt_promise(res, secretKey).then(decryptedData => {
                    // console.log(decryptedData);
                    resolve(decryptedData);
                })
            }).catch(err => {
                reject(err);
            })
        })
    } catch (error) {
        console.log(error);
    }
}

// getPrivateKey('faultycarry', 'shubhamkoli').then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log(err);
// })

module.exports = {
    decrypt_promise,
    getPrivateKey
}