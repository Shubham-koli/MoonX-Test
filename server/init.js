const mongoose = require('./MongoDB/mongoose');
const {
    ketPart1,
    keyPart2
} = require('./models/keyParts');

const {
    saveKey1,
    saveKey2,
    storeKeys
} = require('./MongoDB/keys');

//saveKey1 takes first half of SHA256 hash of userID as _id for storing in mongodb and first half part of cryptographic text of user's private key 
saveKey1('916aa164546e96c81085c8ced26d029', 'U2FsdGVkX1+xOjcv0nJMaXwbuaaQe10xPK547m0s9vN').then(doc => {
    console.log('Sample User initialized');
}).catch(err => {
    console.log('User has already been initialized');
});

//saveKey2 takes second half of SHA256 hash of userID as _id for storing in mongodb and second half part of cryptographic text of user's private key 
saveKey2('cb13b72b46bb268b6c8734f0026aae9ce', 'q89ZA4vRQvArbDFmC2lXMKFrGjluANOo8Lk+aXP5aQQ==').then(doc => {
    console.log('you can continue with POC');
}).catch(err => {
    console.log('user entry already exists');
});

// storeKeys('MoonXUsername', 'MoonXPrivateKey', 'MoonXPassword', 'MoonXEncryptionToken');