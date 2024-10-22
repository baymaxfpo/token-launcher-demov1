require('dotenv').config();
const { PINATA_JWT_KEY} = process.env;
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT_KEY});

const fs = require('fs');
const options = {
    pinataMetadata: {
        name: "Hello-World-Wallpaper.jpg",
        keyvalues: {
            key_1: 'value_1'
        }
    },
};
pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});