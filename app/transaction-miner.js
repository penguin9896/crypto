
const Transaction = require('../wallet/transaction');





class TransactionMiner{



    constructor({blockchain, transactionPool, wallet, pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;


    }



    
    mineTransactions(){
        //get the transation pool's valid trancactions
        const validTransaction = this.transactionPool.validTransactions();



        //generate the miner's reward


        validTransaction.push(
        Transaction.rewardTransaction({minerWallet: this.wallet})
        );

        //add a block consisting of these transaction to the blockchain
            this.blockchain.addBlock({data: validTransaction});


            this.pubsub.broadcastChain();
    
        //broadcast the updates blockchain
    
    
        //clear the pool
    
        this.transactionPool.clear();
    }




}


module.exports = TransactionMiner;