const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

/*
//node dev/test.js
const bc1 = {
    "chain": [
      {
        "index": 1,
        "timestamp": 1608749562938,
        "transactions": [],
        "nonce": 100,
        "hash": "0",
        "previousBlockHash": "0"
      },
      {
        "index": 2,
        "timestamp": 1608749706013,
        "transactions": [],
        "nonce": 18140,
        "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
        "previousBlockHash": "0"
      }
    ],
    "pendingTransactions": [
      {
        "amount": 12.5,
        "sender": "00",
        "recipient": "09d1b290455011eb98a037e4350e17cf",
        "transactionId": "5f2c6fa0455011eb98a037e4350e17cf"
      }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
  }


console.log('Doğruluk : ', bitcoin.chainIsValid(bc1.chain));
*/
