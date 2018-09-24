import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';


//import services
import { logoutuser } from '../../services/authentication.service';

// import images
import userimg from '../../images/user-icon.png'

// import css files
import './header.css'


class Header extends Component {

    logout(){ logoutuser().then(res=>{ this.props.getHistory.history.push('/login') }) }

    render() {
        return (

            <div className="nav-main prnt-navbar">
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
                                    <img className="usr-dp" src={userimg} alt="logo" />
                                </div>
                                <div className="user-id" title="Atta">Atta</div>
                                <ul>
                                    <li><Link to="/userprofile/123"><i className="fa fa-user" aria-hidden="true"></i> Profile</Link></li>
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

