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
        
    /* Open the sidenav */
    openNav() {
        document.getElementById("mySidenav").style.width = "250px";

    }

    /* Close/hide the sidenav */
    closeNav(){
        document.getElementById("mySidenav").style.width = "0";
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
                        <div className="col-md-6 col-sm-5 col-xs-12">
                            <Navbar.Brand>
                                <Link to="/dashboard" className="hd-hr">Employee Tracker</Link>
                                
                            </Navbar.Brand>
                            <span onClick={this.openNav} className="rspnov"><i className="fa fa-bars"></i></span>
                        </div>
                        <div className="col-md-3 col-sm-2 hidden-xs text-right">
                            <a href="/notification" className="notifictaions"><i className="fa fa-bell-o" aria-hidden="true"></i></a>
                        </div>
                        <div className="col-md-1 col-sm-2 col-xs-2 hidden-xs text-right">
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="col-md-2 col-sm-3">
                        
                            <div className="nvright hidden-xs">
                                <div className="img-div">
                                    <img className="usr-dp" src=
                                        {
                                            (this.state.userinfo && this.state.userinfo.ImageUrl) ?
                                                this.state.userinfo.ImageUrl : userimg
                                        } alt="logo" />
                                </div>
                                <div className="user-id" title={this.state.userinfo.FullName}>
                                    {this.state.userinfo.FullName}
                                </div>
                                <ul>
                                    <li><Link to={'/userprofile/' + uid} ><i className="fa fa-user" aria-hidden="true"></i> Profile</Link></li>
                                    <li><a href="javascript:;" onClick={this.logout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                    <div className="img-div img-div-respo">
                        <img className="usr-dp" src=
                            {
                                (this.state.userinfo && this.state.userinfo.ImageUrl) ?
                                    this.state.userinfo.ImageUrl : userimg
                            } alt="logo" />
                    </div>
                    <div className="user-id user-id-respo" title={this.state.userinfo.FullName}>
                        {this.state.userinfo.FullName}
                    </div>
                    <Link to={'/userprofile/' + uid} ><i className="fa fa-user" aria-hidden="true"></i> Profile</Link>
                    <label className="switch switch2"><input type="checkbox"/><span className="slider round"></span></label>
                    <a href="javascript:;" onClick={this.logout.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                    
                </div>

            </div>
        )
    }
}

export default Header;

