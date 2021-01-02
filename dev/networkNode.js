const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const { v1: uuid } = require('uuid');
const port = process.argv[2];
const rp = require('request-promise');
const request = require('request');

const nodeAddress = uuid().split('-').join('');
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

app.post('/transaction', function(req, res) {
    const newTransaction = req.body;
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
    //res.json({note: `Transaction will be added in block ${blockIndex}.`});

    res.redirect('/mine');
}); 

app.post('/transaction/broadcast', function(req, res) {
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises).then(data => {
        res.json({ note: 'Transaction created and broadcast successfully.'});
    });
});

app.get('/mine', function(req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];

    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };

    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const currentBlockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, currentBlockHash);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/receive-new-block',
            method: 'POST',
            body: { newBlock: newBlock},
            json: true
        };

        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then(data => { //Ek sayfaya geçip yazı yazdırma yeri.
        res.json({
            note: "New block mined & broadcast successfully",
            block: newBlock
        })
    });

    res.redirect('/block-add');
})

app.post('/receive-new-block', function(req, res) {
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];    
    
    if(correctHash && correctIndex) {
        bitcoin.chain.push(newBlock);
        bitcoin.pendingTransactions = [];
        res.json({
            note: 'new block received and accepted.',
            newBlock: newBlock
        });
    }
    else {
        res.json({
           note: 'new block rejected.',
           newBlock: newBlock 
        });
    }
});

//register a node and broadcast it the network
app.post('/register-and-broadcast-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);
    
    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true
        };

        regNodesPromises.push(rp(requestOptions));  
    });
    Promise.all(regNodesPromises).then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl] },
            json: true
        };
        return rp(bulkRegisterOptions);
    })
    res.redirect('/')
});

//register a node with the network
app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({note: 'New node registered successfully.'});
});

//register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });
    res.json({ note: 'Bulk registeration successfully.'});
});



app.get('/consensus', function(req, res) {
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/blockchain',
            method: 'GET',
            json: true 
        };

        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then(blockchains => {
        const currentChainLength = bitcoin.chain.length;
        let maxChainLength = currentChainLength;
        let newLongestChain = null;
        let newPendingTransactions = null;
        blockchains.forEach(blockchain => {
            if(blockchain.chain.length > maxChainLength) {
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPendingTransactions = blockchain.pendingTransactions;
            };
        });

        if(!newLongestChain || (newLongestChain && !bitcoin.chainIsValid(newLongestChain))) {
            res.json({
                note: 'Current chain has not been replaced.',
                chain: bitcoin.chain
            });
        }
        else if(newLongestChain && bitcoin.chainIsValid(newLongestChain)) {
            bitcoin.chain = newLongestChain;
            bitcoin.pendingTransactions = newPendingTransactions;
            res.json({
                note: 'This chain has been replaced.',
                chain: bitcoin.chain
            });
        }
    });
});

/**
 * Son Adım 
 */

app.get('/block', function(req, res) {
    const getLastBlockHash = bitcoin.getLastBlock();
    res.json({
        block: getLastBlockHash
    });
});

app.get('/block/:blockHash', function(req, res) { //Hash ifadesine göre arama yapar.
    const blockHash = req.params.blockHash;
    const correctBlock = bitcoin.getBlock(blockHash);
    res.json({
        block: correctBlock
    });
});


app.get('/transaction/:transactionId', function(req, res) {
    const transactionId = req.params.transactionId;
    const transactionData = bitcoin.getTransaction(transactionId);
    res.json({
        transaction: transactionData.transaction,
        block: transactionData.block 
    });
});


app.get('/address/:address', function(req, res) {
    const address = req.params.address;
    const addressData = bitcoin.getAddressData(address);
    res.json({
        addressData: addressData 
    });
});

/**
 * Son Adım
 */

app.get('/', function(req, res) {
    res.sendFile('./index.html', {root: __dirname});
});

app.get('/block-explorer', function(req, res) {
    res.sendFile('./block-explorer/index.html', { root: __dirname });
});

app.get('/block-add', function(req, res) {
    res.sendFile('./block-add/index.html', {root: __dirname});
});

app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
})