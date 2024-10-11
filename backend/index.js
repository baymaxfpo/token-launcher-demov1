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

// Connect Wallet endpoint
app.post('/connect-wallet', (req, res) => {
    const { metaMaskAccount } = req.body;
    let user = users.find(u => u.metaMaskAccount === metaMaskAccount);
    if (!user) {
        user = { metaMaskAccount, submissions: [] };
        users.push(user);
    }
    res.json({ message: 'MetaMask account connected!', user });
});

// Submit action endpoint
app.post('/submit-action', upload.single('proof'), async (req, res) => {
    const { proof,description, userWallet } = req.body;
    const proofFile = req.file;

    if (!proofFile) {
        return res.status(400).json({ message: 'Proof file is required.' });
    }

    const readableStreamForFile = fs.createReadStream(proofFile.path);
    const options = {
        pinataMetadata: {
            name: proofFile.originalname,
            keyvalues: {
                user: userWallet
            }
        },
        pinataOptions: {
            cidVersion: "1"
        }
    };

    try {
        const fileResult = await pinata.pinFileToIPFS(readableStreamForFile, options);
        const submission = { userWallet, description, proof: fileResult.IpfsHash, status: 'pending' };

        // Upload submission metadata to IPFS
        const jsonResult = await pinata.pinJSONToIPFS(submission, options);

        fs.unlinkSync(proofFile.path); // Delete file after uploading to IPFS
        res.json({ message: 'Submission successful!', submissionHash: jsonResult.IpfsHash });
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        res.status(500).json({ message: 'Error uploading proof to IPFS.' });
    }
});

// Fetch submissions by user address
app.get('/submissions/:userWallet', async (req, res) => {
    const { userWallet } = req.params;
    try {
        const pinnedJSONs = await pinata.pinList({
            status: 'pinned',
            metadata: {
                keyvalues: {
                    user: {
                        value: userWallet,
                        op: 'eq'
                    }
                }
            }
        });
        const submissions = pinnedJSONs.rows.map(row => row.ipfs_pin_hash);
        res.json({ submissions });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Error fetching submissions from IPFS.' });
    }
});

// Approve/Deny endpoints
app.post('/approve', async (req, res) => {
    const { submissionHash } = req.body;
    try {
        const pinnedJSON = await pinata.pinJSONToIPFS({ status: 'approved' }, { pinataMetadata: { name: submissionHash } });
        res.json({ message: 'Submission approved!', submissionHash: pinnedJSON.IpfsHash });
    } catch (error) {
        console.error('Error approving submission:', error);
        res.status(500).json({ message: 'Error approving submission.' });
    }
});

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
