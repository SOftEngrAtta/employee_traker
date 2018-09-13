import React , { Component } from 'react';

// services 
import { createaccount } from '../../../services/authentication.service';

class SignUp extends Component {

    constructor(props){
        super(props)
        this.state = {
            EmailAddress : '',
            Password : ''
        }
    }

    handler(_e , event){
        


        if(_e === 'email'){
            this.setState({
                EmailAddress : event.target.value
            })
        }
        if(_e === 'password'){
            this.setState({
                Password : event.target.value
            })
        }
    }

    _createAccount(){
        createaccount({
            EmailAddress :this.state.EmailAddress,
            Password : this.state.Password
        })
        .then(success=>{
            console.log(success)
        },error=>{
            console.log(error);
        })
    }

    render(){
        return(
            <div>
                <h1> Create Account </h1>
                <div>
                    <input placeholder="Email Address" onChange={ this.handler.bind(this , 'email') }/>
                    <input placeholder="Password" onChange={ this.handler.bind(this , 'password') }/>
                    <button onClick={ this._createAccount.bind(this) }>Sign In</button>
                </div>
            </div>
        )
    }
}

export default SignUp