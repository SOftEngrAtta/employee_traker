import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar , Nav , NavItem } from 'react-bootstrap/lib';

import userimg from '../../images/user-icon.png'

import './header.css'

class Header extends Component {
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
                        <div className="img-div">
                            <img src={ userimg } alt="logo"/>
                        </div>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;

