import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';

import userimg from '../../images/user-icon.png'

import './header.css'

class Header extends Component {

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
                        <div class="col-md-3 text-right">
                        <a href="/notification" className="notifictaions"><i class="fa fa-bell-o" aria-hidden="true"></i></a>
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
                                    <img src={userimg} alt="logo" />
                                </div>
                                <div className="user-id" title="Atta">Atta</div>
                                <ul>
                                    <li><a href="/userprofile/123"><i class="fa fa-user" aria-hidden="true"></i> Profile</a></li>
                                    <li><a href="/"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <Navbar className="prnt-navbar" inverse collapseOnSelect>
            //     <Navbar.Header>
            //         <Navbar.Brand>
            //             <Link to="/dashboard" className="hd-hr">Employee Tracker</Link>
            //         </Navbar.Brand>
            //     </Navbar.Header>
            //     <Nav pullRight>
            //         <NavItem>
            //             <div className="toggeswtch">
            //                 <label className="switch">
            //                     <input type="checkbox" />
            //                     <span className="slider round"></span>
            //                 </label>
            //             </div>
            //         </NavItem>
            //         <NavItem >
            //             <div className="nvright">
            //                 <div className="img-div">
            //                     <img src={userimg} alt="logo" />
            //                 </div>
            //                 <div className="user-id">Atta</div>
            //                 <ul>
            //                     <li><a href="/">Profile</a></li>
            //                     <li><a href="/">Logout</a></li>
            //                 </ul>
            //             </div>
            //         </NavItem>
            //     </Nav>
            // </Navbar>
        )
    }
}

export default Header;

