import React, {Component} from 'react';
import { render } from 'react-dom';
import {Button} from 'react-bootstrap';
import Transaction from './Transaction';



class Block extends Component {
    state = {displayTransaction: false };

    toggleTransaction = () =>{

        this.setState({displayTransaction : !this.state.displayTransaction});
    }


    get displayTransaction  () {

        const { data } = this.props.block;

        const stringifiedData = JSON.stringify(data);

    const dataDisplay = stringifiedData.length > 35 ?
     `${stringifiedData.substring(0,35)}...` :
     stringifiedData;




     
        if(this.state.displayTransaction){
            return(
            <div>
              {

                  data.map(transaction => (
                  <div key = {transaction.id}> 
                  <hr/>
                  <Transaction transaction = {transaction} />

                  </div>
                      
                      ))
              }
                <br/>

                <div> 
        
            <Button 
            bsStyle="danger" bsSize="small"
             onClick={this.toggleTransaction}>
                 Show Less</Button>
            </div>


            </div>);

        }


        return ( <div> 
                <div> 
            data :{dataDisplay}
            <Button 
            bsStyle="danger" bsSize="small"
             onClick={this.toggleTransaction}>
                 Show more</Button>
            </div>
            
            </div>);
        

    }

render(){

    console.log('this.displayTransaction', this.displayTransaction);

    

    const {timestamp, hash } = this.props.block;


    const hashDisplay = `${hash.substring(0,15)}...`;

    

        return(

            <div className = 'Blocks'>
                <div>Hash: {hashDisplay}</div>
                <div>TimeStamp: {new Date(timestamp).toLocaleString()} </div>
                {this.displayTransaction}
            </div>

        )
    }
};

export default Block;