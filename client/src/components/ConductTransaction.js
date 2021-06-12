import React, {Component} from 'react';
import {FormGroup, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import history from '../history';



class ConductTransaction extends Component {
   // state = {recipient: '', amount: 0, knownAdresses:{} };
    state = {recipient: '', amount: 0 };


    
/*
    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
          .then(response => response.json())
          .then(json => this.setState({ knownAddresses: json }));
      }
*/



    updateRecipient = event =>{
        this.setState({recipient: event.target.value});


    }


    
    updateAmount = event =>{
        this.setState({amount: Number(event.target.value)});


    }

     
    conductTransaction = () => {
        const {recipient, amount} = this.state;


        fetch(`${document.location.origin}/api/transact`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({recipient, amount})
        }).then(response => response.json())
        .then(json => { 
            alert(json.message || json.type);
            history.push('/transaction-pool');
        });
    }



    render(){
        console.log('this.state', this.state);
        return( 
            <div className='ConductTransaction'>
            <Link to = '/'> Home </Link>
                <h3>Conduct a Transaction </h3>
                <FormGroup>

                <FormControl input='text'
                 placeholder='recipient'
                  value={this.state.recipient}
                  onChange={this.updateRecipient}
                  />

                </FormGroup>



                <FormGroup>

            <FormControl input='number'
                 placeholder='amount'
                  value={this.state.amount}
                  onChange={this.updateAmount}
                  />
                    <div>
                    <Button
                    bsStyle="danger"
                    onClick={this.conductTransaction}
                    
                    >

                    Submit
                    </Button>

                    </div>


                </FormGroup>
            </div>
    )

    }

}

export default ConductTransaction;