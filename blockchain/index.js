const Block = require('./block');
const Transation = require('../wallet/transaction');
const Wallet = require('../wallet');
const {cryptoHash} = require('../util');
const { REWARD_INPUT, MINING_REWARD } = require('../config');


class Blockchain{


constructor(){

this.chain = [Block.genesis()];


    }

    addBlock({ data }){


       const newBlock = Block.mineBlock({ lastBlock:this.chain[this.chain.length-1],
        
        data});



        this.chain.push(newBlock);

    }

    replaceChain(chain, validateTransactions ,onSuccess){
       
       if(chain.length <= this.chain.length){
        console.error('The incoming chain must be longer');   
        return;

       }
            if(!Blockchain.isValidChain(chain)){
            console.error('the incoming chain must be valid');
            return;
    }

    if( validateTransactions && !this.validTransactionData(chain)){
        console.error('the incmoing chain has invalid data');
        return;

    }

       if(onSuccess) onSuccess();
        console.log('replacing chain with', chain);
        this.chain = chain;


   


    }


    validTransactionData({chain}){

        for(let i=1; i<chain.length;i++){
            const block = chain[i];

            const transactionSet = new Set();
            let rewardTransactioncount = 0;

            for(let transaction of block.data){
                if(transaction.input.address === REWARD_INPUT.address){
                   
                    rewardTransactioncount +=1;

                    if(rewardTransactioncount >1){
                   
                        console.error('miner rewards exceed limit');
                        return false;

                    }
                    //since we wont know the reward public key grab and object that has all the values and get index 0
                    if(Object.values(transaction.outputMap)[0] !== MINING_REWARD){
                        console.error('Miner reward amount is invalid');
                        return false;

                         
                    }
                } else {
                    if(!Transation.validTransaction(transaction)){
                        console.error('Invalid Transaction');
                        return false;
                    }

                    const trueBalance = Wallet.calculateBalance({
                        chain:this.chain, 
                        address:transaction.input.address
                    });
    
                    if(transaction.input.amount !== trueBalance){
    
                        console.error('invalid input amount');
                        return false;
                    }

                    if(transactionSet.has(transaction))
                    {
                        console.error('an Identical transaction appears more than once in the bloack');
                        return false;
                    } else{
                        transactionSet.add(transaction);
                    }
                }


               
            }
        }
        return true;


    }

    static isValidChain( chain ) {

        if( JSON.stringify(chain[0] ) !==  JSON.stringify( Block.genesis()) )  return false;

    
       for(let i=1; i<chain.length;i++){
                const {timestamp, lastHash, hash, nonce, difficulty ,data} = chain[i];


                const actualLastHash = chain[i-1].hash;

                const lastDifficulty = chain[i-1].difficulty;
         


                if(lastHash !== actualLastHash) return false;

                const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

                if(hash !== validatedHash) return false;

                if( Math.abs(lastDifficulty - difficulty) > 1) return false;
            
            }

            


    return true;
    }

}


module.exports = Blockchain;