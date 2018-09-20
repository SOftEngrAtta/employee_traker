import React , { Component } from 'react';

import './dashboard.css';
// components
import Header from '../header/header';


class Dashboard extends Component {
    render(){
        return(
            <div className="prnt-dashboard">
                <Header />
                <h1>Welcome JOHN</h1> 
            </div>
        )
    }
}

export default Dashboard