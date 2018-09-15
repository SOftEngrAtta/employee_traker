import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar , Nav , NavItem } from 'react-bootstrap/lib';

import userimg from '../../images/user-icon.png'

import './header.css'

class Header extends Component {

    constructor(props){
        super(props)
    }



    render() {
        
        return (
            <Navbar className="prnt-navbar" inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/dashboard" className="hd-hr">Employee Tracker</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem >
                        <div className="img-div" >
                            <Link to="/userprofile/123">
                                <img src={ userimg } alt="logo"/>
                            </Link>
                        </div>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;

