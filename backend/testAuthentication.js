require('dotenv').config();
const { PINATA_JWT_KEY} = process.env;
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT_KEY});

