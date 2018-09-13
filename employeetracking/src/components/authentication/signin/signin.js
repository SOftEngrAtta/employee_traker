import React , { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap/lib';

import './signin.css';
 
import { login } from '../../../services/authentication.service';



class SignIn extends Component {

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

    loginaccount(){
        login({EmailAddress : this.state.EmailAddress,Password : this.state.Password})
        .then(success=>{
            console.log(success);
        },error=>{
            console.log(error);
        })
    }

    render(){
        const formcss = {
            margin : {
                'margin-top':'15px'
            }
        }
        return(
            <div class="signin-prnt">
                <div align="center" class="hd">
                    <h1>Employee Tracker</h1>
                </div>
                <div align="center">
                    <div class="user-icon">
                        <FontAwesome name='user'/>
                    </div>
                </div>
                <div style={ formcss.margin }>
                    <input class="input-field" placeholder="Email Address" onChange={ this.handler.bind(this , 'email') }/>
                </div>
                <div style={ formcss.margin }>
                    <input class="input-field" placeholder="Password" onChange={ this.handler.bind(this , 'password') }/>
                </div>
                <div class="reset-password">
                    <FontAwesome name='lock'/> Reset Password 
                </div>
                <div class="login-btn-prnt" align="center">
                    <Button bsStyle="success" onClick={ this.loginaccount.bind(this) } >Login</Button>
                </div>
                <div class="create-account-parnt" align="center" style={ formcss.margin }>
                    <Link to='/createaccount' class="crt-acnt">Create Account</Link>
                </div>
            </div>
        )
    }
}

export default SignIn