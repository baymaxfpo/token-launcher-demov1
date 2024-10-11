require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const glog = require('glog-parser');

const app = express();
const port = 3100;
const { PINATA_JWT_KEY } = process.env;
const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT_KEY });

// Middleware
app.use(bodyParser.json());
app.use(cors());glog();
const upload = multer({ dest: 'uploads/' });


