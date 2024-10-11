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

// In-memory data storage for demonstration purposes
let users = [];

app.post('/deny', async (req, res) => {
    const { submissionHash } = req.body;
    try {
        const pinnedJSON = await pinata.pinJSONToIPFS({ status: 'denied' }, { pinataMetadata: { name: submissionHash } });
        res.json({ message: 'Submission denied!', submissionHash: pinnedJSON.IpfsHash });
    } catch (error) {
        console.error('Error denying submission:', error);
        res.status(500).json({ message: 'Error denying submission.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


