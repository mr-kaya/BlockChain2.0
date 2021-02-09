const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();


const veri = {"chain":[{"index":1,"timestamp":1610904397399,"transactions":[],"nonce":0,"hash":"0","previousBlockHash":"0"},{"index":2,"timestamp":1610904754190,"transactions":[{"optionId[]":["0","0","1"],"inputId[]":["isim","soyisim","yas"],"listId[]":["mustafa","kaya","23"]}],"nonce":125680,"hash":"00004e5797f338cbcc5be4954fb5121ee6c13556e7d9e0a3f59415354b7a4137","previousBlockHash":"0"}],"pendingTransactions":[],"currentNodeUrl":"http://localhost:3001","networkNodes":[]} 

console.log("doğruluk : "+bitcoin.chainIsValid(veri.chain));

/*
const previousBlockHash = '0AOIEOIJGA325JKSASDKJSADG3GASDG';
const currentBlockData = [
  {
    amount: 101,
    sender: "AOJDSIJAE0EAJGWEJIGAO4",
    recipient: "OJG498JUGOI4IGJOEJGFDKG"
  },
  {
    amount: 202,
    sender: "BSJDSIJAE0EAJGWEJIGAO4",
    recipient: "BSG498JUGOI4IGJOEJGFDKG"
  },
  {
    amount: 303,
    sender: "CSJDSIJAE0EAJGWEJIGAO4",
    recipient: "CSG498JUGOI4IGJOEJGFDKG"
  },
  {
    amount: 404,
    sender: "DSJDSIJAE0EAJGWEJIGAO4",
    recipient: "DSG498JUGOI4IGJOEJGFDKG"
  }
];

console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

*/
/*
bitcoin.createNewBlock(8325324, 'OEGGAO320494', 'JASKOEGOAWJO');
bitcoin.createNewTransaction(100, 'OG34OGJ3434', 'OOFJ30JFAOWJ');
console.log(bitcoin);
*/
/*
console.log(bitcoin);
*/
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
