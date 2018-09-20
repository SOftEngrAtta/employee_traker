import React , { Component } from 'react';

// css files
import './dashboard.css';

//service files 
import { verifyuser } from '../../services/authentication.service';

// components
import Header from '../header/header';


class Dashboard extends Component {

    constructor(props){ super(props) }

    componentDidMount(){
        verifyuser();
    }

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