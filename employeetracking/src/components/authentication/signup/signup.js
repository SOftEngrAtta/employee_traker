import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap/lib';

import './signup.css'

// services 
import { createaccount } from '../../../services/authentication.service';

class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            EmailAddress: '',
            Password: ''
        }
    }

    handler(_e, event) {



        if (_e === 'email') {
            this.setState({
                EmailAddress: event.target.value
            })
        }
        if (_e === 'password') {
            this.setState({
                Password: event.target.value
            })
        }
    }

    _createAccount() {
        createaccount({
            EmailAddress: this.state.EmailAddress,
            Password: this.state.Password
        }).then(success => {
            console.log(success)
            debugger
            this.props.history.push('/dashboard')
        }, error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="signin-prnt">
                <div align="center" className="hd">
                    <h1>Employee Tracker</h1>
                </div>
                <div align="center">
                    <div className="user-icon">
                        <FontAwesome name='user' />
                    </div>
                </div>
                <div className="margn-cls">
                    <input className="input-field" type="text" placeholder="Email Address" onChange={this.handler.bind(this, 'email')} />
                </div>
                <div className="margn-cls">
                    <input className="input-field" type="password" placeholder="Password" onChange={this.handler.bind(this, 'password')} />
                </div>
                <div className="login-btn-prnt" align="center">
                    <Button bsStyle="success" onClick={this._createAccount.bind(this)} >Create Account</Button>
                </div>
                <div className="create-account-parnt margn-cls" align="center">
                    <Link to='/login' className="crt-acnt">Sign In</Link>
                </div>
            </div>
        )
    }
}

export default SignUp
