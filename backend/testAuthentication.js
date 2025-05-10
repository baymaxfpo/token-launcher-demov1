require('dotenv').config();
const { PINATA_JWT_KEY} = process.env;
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT_KEY});

const options = {
    pinataMetadata: {
        name: "Hello-World-Wallpaper.jpg",
        keyvalues: {
            key_1: 'value_1'
        }
    },
    pinataOptions: {
        cidVersion: "1"
    }
};
// We pass in the readable stream for the file, ******and****** the options object.
pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});