const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const rpcUrl = "https://rinkeby.infura.io/v3/d1fdd8caeb5248ec83f1413e78e546f1";


const web3 = new Web3(rpcUrl);


const account = "0x45F4ad5A77aAA7258c8045F9E006BABd70Aa8366";

web3.eth.getBalance(account, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance);
});

const abi =[ { "inputs": [ { "internalType": "address payable", "name": "eoa", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "", "type": "address" }, { "indexed": false, "internalType": "string", "name": "", "type": "string" } ], "name": "winnerevent", "type": "event" }, { "inputs": [], "name": "auctionState", "outputs": [ { "internalType": "enum Auction.State", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "bids", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cancelAuction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "endBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "finalizeAuction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "flag", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestBidder", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "highestBindingBid", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "inc", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ipfsHash", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "length", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "mapl", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "placeBid", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" } ];
//contract address
const address = "0x7993267fff0B6c0885BccBC58d803750D539252b";

const contract = new web3.eth.Contract(abi, address);

//contract.methods.createAuction().send();


/*


const abi1 = [ { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "auctions", "outputs": [ { "internalType": "contract Auction", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "createAuction", "outputs": [ { "internalType": "contract Auction", "name": "", "type": "address" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "numberofcontracts", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numberofcontracts_g", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];

const address1 = "0x9bB5C66CC31288ACE0F4fB3b81E4506B4991c5Ca";

const contract1 = new web3.eth.Contract(abi1, address1);

contract1.methods.auctions(0).call((err, result) => { console.log(result) });
*/

privatek = Buffer.from('c293ca01402b498cf37e541123cb2057fd88fa3963347ab050a6066a92342097', 'hex');
privatekk = '0xc293ca01402b498cf37e541123cb2057fd88fa3963347ab050a6066a92342097';
//imported account
const account1 = "0x932DE9e64C1c06bE274F55dcEe9deAEA0edD8120";

web3.eth.getBalance(account1, (err, wei) => {
    balance = web3.utils.fromWei(wei, 'ether')
    console.log(balance);
});


//build transaction
web3.eth.getTransactionCount(account1, (err, txCount) =>{
//smart contract data
 
    
const txObject = {
        nonce: web3.utils.toHex(txCount) ,
        to: '0x8c6f95A1c5CA2647965d5C22BEF79AcD1a17EEe1',
        value: web3.utils.toHex( web3.utils.toWei('0.0001','ether')) ,
        gasLimit: web3.utils.toHex(200000)  ,
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')) ,
        data: 
    
    }
    console.log(txObject);

    
const tx = new Tx(txObject, {chain:'rinkeby'});

tx.sign(privatek);


const serializedTransaction = tx.serialize();
const raw = '0x' + serializedTransaction.toString('Hex');

//broadcast transaction
web3.eth.sendSignedTransaction(raw, (err, txHash) =>{
console.log("txHash:", txHash );

});



// web3.eth.getBalance(account1, (err, wei) => {
//     balance = web3.utils.fromWei(wei, 'ether')
//     console.log(balance);
// });



});




 //let send = web3.eth.sendTransaction({from:privatekk, to:"0xD0762510d4D90BcE826CB22c66FBC974d9Aa3Ce2", value:web3.utils.toWei('10','gwei')});

 //console.log(send);

//contract.methods.numberofcontracts().call((err, result) => { console.log("number of contracts: ", result) });


// Sign the transaction




