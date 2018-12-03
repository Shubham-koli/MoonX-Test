const mongoose = require('./mongoose');
const {
    encrypt_promise,
    getId
} = require('../cryptography/encryption/encrypt');

const {
    keyPart1,
    keyPart2
} = require("../models/keyParts");


let storeKeys = async (uid, privateKey, pwd, secretKey) => {
    try {
        let id = await getId(uid);

        //encrypting the private key with the MoonX platform's secret key.
        encrypt_promise(privateKey, secretKey).then(res => {

            //encrypting the private key with the User's secret key (Password).
            encrypt_promise(res, pwd).then(encryptedData => {

                console.log(id);
                console.log(encryptedData);
                saveKey1(id.id1, encryptedData.substr(0, 43));
                saveKey2(id.id2, encryptedData.substr(43, 88));
            }).catch(err => {
                console.log('error while encrypting data with user password OR saving key in mongoDB');
            });
        }).catch(err => {
            console.log('error while encrypting data with platform key');
            console.log(err);
        });;

    } catch (err) {
        console.log(err);
    }
}


// saving first part of the key and _id in the diffrent collection of mongoDb
//This module takes 1st half of the SHA256 hash of the username and 1st half of the AES-256 encrypted private key 
let saveKey1 = (id, encryptedData) => {
    return new Promise((resolve, reject) => {
        let newKey = new keyPart1({
            _id: id,
            key: encryptedData
        });
        newKey.save().then(doc => {
            resolve(doc);
        }).catch(err => {
            reject(err);
        })
    });
}

// saving second part of the key and _id in the diffrent collection of mongoDb. 
//This module takes 2nd half of the SHA256 hash of the username and 2nd half of the AES-256 encrypted private key 
let saveKey2 = (id, encryptedData) => {
    return new Promise((resolve, reject) => {
        let newKey = new keyPart2({
            _id: id,
            key: encryptedData
        });
        newKey.save().then(doc => {
            resolve(doc);
        }).catch(err => {
            reject(err);
        })
    });
}
// storeKeys('MoonXUsername', 'MoonXPrivateKey', 'MoonXPassword', 'MoonXEncryptionToken');

//This module takes username as input and extracts encrypted private key from database ( private key is still in encrypted form)
let getKeyFromDB = async (uid) => {
    try {
        let id = await getId(uid);
        let key1 = await keyPart1.findById(id.id1);
        let key2 = await keyPart2.findById(id.id2);
        return new Promise((resolve, reject) => {
            resolve(key1.key + key2.key);
        }).catch(err => {
            console.log(err);
        })
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    storeKeys,
    getKeyFromDB,
    saveKey1,
    saveKey2
}