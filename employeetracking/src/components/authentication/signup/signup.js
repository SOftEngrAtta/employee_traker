import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

//shared files
import DisplayMessage , { SuccessMessage  , ErrorMessage } from '../../../shared/responsemsg';

// bootstrap 
import { Button } from 'react-bootstrap/lib';

// css files
import './signup.css'

// services 
import { createaccount } from '../../../services/authentication.service';
import { saveuserdb } from '../../../services/employee.service'

class SignUp extends Component {

    constructor(props) {
        super(props);
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

        if(!this.state.EmailAddress){ ErrorMessage('Enter email address'); return false; }

        if(!this.state.Password){ ErrorMessage('Enter password'); return false; }

        if(this.state.Password && this.state.Password < 8){ ErrorMessage('Password length should be greater than 8 digits') }

        createaccount({
            EmailAddress: this.state.EmailAddress,
            Password: this.state.Password
        }).then(success => {
            this.saveUserRecord({
                EmailAddress: success.user.email,
                Id: success.user.uid
            });
        }, error => {
            ErrorMessage('Getting some error, contact with support team' , error);
        })
    }

    saveUserRecord(data){
        saveuserdb(data)
        .then(res=>{
            SuccessMessage('User has been created');
        }, error => {
            ErrorMessage('Getting some error, contact with support team');
        })
    }

    render() {
        return (
            <div className="signin-prnt">
                <DisplayMessage timeduration={ 2000 }/>
                <div align="center" className="hd">
                    <h1>Employee Tracker</h1>
                </div>
                <div align="center">
                    <div className="user-icon">
                        <FontAwesome name='user' />
                    </div>
                </div>
                <div className="margn-cls">
                    <input className="input-field" 
                        type="text" 
                        placeholder="Email Address" 
                        value={ this.state.EmailAddress }
                        onChange={this.handler.bind(this, 'email')} />
                </div>
                <div className="margn-cls">
                    <input className="input-field" 
                        type="password" 
                        placeholder="Password" 
                        value={ this.state.Password }
                        onChange={this.handler.bind(this, 'password')} />
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
