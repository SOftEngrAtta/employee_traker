import React , { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom';


//shared files
import DisplayMessage , { SuccessMessage  , ErrorMessage } from '../../../shared/responsemsg';


// bootstrap
import { Button } from 'react-bootstrap/lib';

//css files
import './signin.css';
 
//service
import { login } from '../../../services/authentication.service';
import { setkey_data , clearhistory } from '../../../services/storage.service';

class SignIn extends Component {

    constructor(props){
        super(props)
        this.state = {
            EmailAddress : '',
            Password : ''
        }
    }

    componentDidMount(){ clearhistory(); }

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

    loginaccountpressenterbtn(e){
        if(e.charCode === 13){ 
            this.loginaccount() 
        }
    }

    loginaccount(){

        if(!this.state.EmailAddress){ErrorMessage('Enter email address');return false;}

        if(!this.state.Password){ErrorMessage('Enter password');return false;}

        login({EmailAddress : this.state.EmailAddress,Password : this.state.Password})
        .then(success=>{
            SuccessMessage('Login successfully')
            setkey_data({'KeyName': 'Id' , 'KeyData': success.user.uid});
            this.props.history.push('/dashboard');
        },error=>{

            if(error && error.message){
                ErrorMessage("Error: "+error.message)
            }else ErrorMessage('Invalid username and password'); 
        })
    }

    render(){
       
        return(
            <div className="signin-prnt">
                <DisplayMessage timeduration={ 2000 }/>
                <div align="center" className="hd">
                    <h1>Employee Tracker</h1>
                </div>
                <div align="center">
                    <div className="user-icon">
                        <FontAwesome name='user'/>
                    </div>
                </div>
                <div className="margn-cls" >
                    <input className="input-field" 
                        placeholder="Email Address" 
                        value={ this.state.EmailAddress } 
                        type="text"
                        onChange={ this.handler.bind(this , 'email') }/>
                </div>
                <div className="margn-cls">
                    <input className="input-field" 
                        placeholder="Password" 
                        value={ this.state.Password }
                        type="password"
                        onChange={ this.handler.bind(this , 'password') }
                        onKeyPress={ this.loginaccountpressenterbtn.bind(this) }/>
                </div>
                <div className="reset-password">
                    <FontAwesome name='lock'/> Reset Password 
                </div>
                <div className="login-btn-prnt" align="center">
                    <Button bsStyle="success" onClick={ this.loginaccount.bind(this) } >Login</Button>
                </div>
                <div className="create-account-parnt margn-cls" align="center" >
                    <Link to='/createaccount' className="crt-acnt">Create Account</Link>
                </div>
            </div>
        )
    }
}

export default SignIn