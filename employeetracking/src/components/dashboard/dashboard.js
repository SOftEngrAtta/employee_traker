import React , { Component } from 'react';

import './dashboard.css';
// components
import Header from '../header/header';


class Dashboard extends Component {
    render(){
        return(
            <div className="prnt-dashboard">
                <Header />
            </div>
        )
    }
}

export default Dashboard