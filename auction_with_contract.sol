//SPDX-License-Identifier: GPL-3.0
 
pragma solidity 0.8.0 ;
 
 
// this contract will deploy the Auction contract
contract AuctionCreator{
    // declaring a dynamic array with addresses of deployed contracts
    Auction[] public auctions; 
    uint public numberofcontracts;
    uint public n=0;
    uint public v=0;
    string public nm ="asd";
 
    
    // receive() payable external{
                
    // sets();
            
    // }
    
    
    function sets() public{
        n=5;
        string memory mm ="ASdasdasd";
        nm = mm;
        
    }
    
    // declaring the function that will deploy contract Auction
    function createAuction() public {
        numberofcontracts++;
        // passing msg.sender to the constructor of Auction 
       // Auction newAuction = new Auction(payable(msg.sender)); 
    //    auctions.push(newAuction); // adding the address of the instance to the dynamic array
//        return(newAuction);
        
    }



    function numberofcontracts_g() public view returns(uint){
    
        return numberofcontracts;
    }
    
}
 
 
 
 
 
contract Auction{
    
    address payable public owner;
    uint public startBlock;
    uint public endBlock;
    string public ipfsHash;
 
    bool public flag;
    enum State {Started, Running, Ended, Canceled}
    State public auctionState;
    
    uint public highestBindingBid;
     
     int public inc;
    
    address payable public highestBidder;
    mapping(address => uint) public bids;
    
    address []  public mapl; 
    
    uint bidIncrement;
    
  
    //string [] public mapl; 
    uint public length;
    
    event winnerevent(address, string);
    
    /*
    function getstring(string memory n, uint m) public{
        
        if(bids[n] == 0 && m >0)
       { bids[n] = m;
        
        mapl.push(n);
        length++;
     } else{
         
         bids[n] = m;
     }
    
    }*/
    
    
    
    constructor(address payable eoa){
        owner = eoa;
        auctionState = State.Running;
        
        startBlock = block.number;
        endBlock = startBlock + 100000000000000000000000000;
      
        ipfsHash   = "https://ipfs.io/ipfs/QmW8MD9cvkuVuBtVbRKhQCLESV9bVSDrUoNcoeUeqezFja?filename=dsp.txt";
        bidIncrement = 1000000000000000000;
    }
    
    
    
    receive() payable external{
     
           if(auctionState == State.Ended && payable(msg.sender) == highestBidder)
      {
          
           emit winnerevent(msg.sender, ipfsHash);
      } else {
          
      flag = placeBid();
      }
      

      
      
     
    
    }
    
    // declaring function modifiers
    modifier notOwner(){
        require(msg.sender != owner);
        _;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    modifier afterStart(){
        require(block.number >= startBlock);
        _;
    }
    
    modifier beforeEnd(){
        require(block.number <= endBlock);
        _;
    }
    
    
    //a helper pure function (it neither reads, nor it writes to the blockchain)
    function min(uint a, uint b) pure internal returns(uint){
        if (a <= b){
            return a;
        }else{
            return b;
        }
    }
    
    // only the owner can cancel the Auction
    function cancelAuction() public onlyOwner{
        auctionState = State.Canceled;
    }
    
    
    // the main function called to place a bid
    function placeBid() public payable notOwner afterStart beforeEnd returns(bool){
       inc++;
       
        // to place a bid auction should be running
        require(auctionState == State.Running);
        // minimum value allowed to be sent
         require(msg.value > 0.0001 ether);
        
        
        uint currentBid = bids[msg.sender] + msg.value;
        
        // the currentBid should be greater than the highestBindingBid. 
        // Otherwise there's nothing to do.
        require(currentBid > highestBindingBid);
        
        // updating the mapping variable
        
       // bids[msg.sender] = currentBid;
        
            if(bids[msg.sender] == 0 )
         { bids[msg.sender] = currentBid;
        
        mapl.push(msg.sender);
        length++;
        }          else{
         
         bids[msg.sender] = currentBid;
             }
    
        
        
        
        
        if (currentBid <= bids[highestBidder]){ // highestBidder remains unchanged
            highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);
        }else{ // highestBidder is another bidder
             highestBindingBid = min(currentBid, bids[highestBidder] + bidIncrement);
             highestBidder = payable(msg.sender);
        }
    return true;
    }
    
    
    
    function finalizeAuction() public{
       // the auction has been Canceled or Ended
      // require(auctionState == State.Canceled || block.number > endBlock); 
       
       // only the owner or a bidder can cancel the auction
       require(msg.sender == owner || bids[msg.sender] > 0);
       
       // the recipient will get the value
       address payable recipient;
       uint value;
       
       /*
       if(auctionState == State.Canceled){ // auction canceled, not ended
           recipient = payable(msg.sender);
           value = bids[msg.sender];
       }else{
           
           
           // auction ended, not canceled
           if(msg.sender == owner){ //the owner finalizes the auction
               recipient = owner;
               value = highestBindingBid;
           }else{// another user (not the owner) finalizes the auction
               if (msg.sender == highestBidder){
                   recipient = highestBidder;
                   value = bids[highestBidder] - highestBindingBid;
               }else{ //this is neither the owner nor the highest bidder (it's a regular bidder)
                   recipient = payable(msg.sender);
                   value = bids[msg.sender];
               }
               
           
               
           }
      }
       
     */  
       //transfer money to owner
              recipient = owner;
               value = highestBindingBid;
       recipient.transfer(value);
        
        
        // transfer money to highestbidder
     recipient = highestBidder;
                   value = bids[highestBidder] - highestBindingBid;
                   bids[highestBidder] =0;
                   recipient.transfer(value);
        
       
       for(uint i=0;i<length-1;i++){
           
           recipient = payable(mapl[i]);
           value = bids[recipient];
           recipient.transfer(value);
           
           
       }
       //sends value to the recipient
       
       auctionState = State.Ended;
     
    }
 
}
