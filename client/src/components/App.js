import React, {Component} from 'react';
import Blocks from './Blocks';
import {Link} from 'react-router-dom';
import logo from 'url:../assets/logo.png';


class App extends Component{
    state = { walletInfo: { } };


    componentDidMount(){
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({walletInfo: json}));

    }


 render(){
 
    const { address, balance} = this.state.walletInfo;
    return (

        <div className='App'>
     
            <br/>
            <div>Welcome to the blockchain..</div>
            <br/>
            <br></br>
            <div>  <Link to ='/blocks'Link> Blocks</Link>   </div>

            <br></br>
            <div>  <Link to ='/conduct-transaction'> Conduct a transaction</Link>   </div>
            <div>  <Link to ='/transaction-pool'> Transaction Pool</Link>   </div>
          
            <div className='WalletInfo'>
            <div> Address: {address}</div>
            <div> Balance: {balance}</div>

            </div>
            
            <br></br>
            <Blocks/>
        </div>
    );

 }

}



export default App;

