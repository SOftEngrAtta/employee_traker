import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';


//import services
import { logoutuser } from '../../services/authentication.service';
import { checkuser } from '../../services/employee.service'
import { getkey_data } from '../../services/storage.service';

// import files from shared folder 
import DisplayMessage , { ErrorMessage } from '../../shared/responsemsg';

// import images
import userimg from '../../images/user-icon.png'

// import css files
import './header.css'

let uid = '';

class Header extends Component {

    constructor(props){ 
        super(props);
        this.state = {
            userinfo: {}
        }

        uid = getkey_data({'KeyName' : 'Id'});

        setInterval(()=>{
            let customerinfo = getkey_data({'KeyName':'customerinfo'});
            if(customerinfo){
                this.setState({
                    userinfo : JSON.parse(customerinfo)
                })
            }
        },1000)
    }

    componentDidMount(){
        
        let customerinfo = getkey_data({'KeyName':'customerinfo'});
        if(!customerinfo){
            checkuser(uid)
            .then(res=>{
                this.setState({
                    userinfo : res.val()
                })
            },error=>{
                ErrorMessage('Error: ',(error.message)?error.message:'something went wrong');
            })
        }else{
            this.setState({
                userinfo : JSON.parse(customerinfo)
            })
        }

    }


    logout(){ logoutuser().then(res=>{ this.props.getHistory.history.push('/login') }) }

    render() {
        return (

            <div className="nav-main prnt-navbar">
                <DisplayMessage timeduration={ 2000 }/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Navbar.Brand>
                                <Link to="/dashboard" className="hd-hr">Employee Tracker</Link>
                            </Navbar.Brand>
                        </div>
                        <div className="col-md-3 text-right">
                        <a href="/notification" className="notifictaions"><i className="fa fa-bell-o" aria-hidden="true"></i></a>
                        </div>
                        <div className="col-md-1 text-right">
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="col-md-2">
                            <div className="nvright">
                                <div className="img-div">
                                    <img className="usr-dp" src=
                                        { 
                                            (this.state.userinfo && this.state.userinfo.ImageUrl) ? 
                                            this.state.userinfo.ImageUrl : userimg 
                                        } alt="logo" />
                                </div>
                                <div className="user-id" title={ this.state.userinfo.FullName }>
                                    { this.state.userinfo.FullName }
                                </div>
                                <ul>
                                    <li><Link to={'/userprofile/'+uid} ><i className="fa fa-user" aria-hidden="true"></i> Profile</Link></li>
                                    <li><a href="javascript:;" onClick={ this.logout.bind(this) }><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;

