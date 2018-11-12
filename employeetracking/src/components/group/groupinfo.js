import React , { Component } from 'react';

//components 
import Header from '../header/header';


export default class GroupInfo extends Component{
    render(){
        return(
            <div>
                <Header getHistory={this.props} />
                <h1>
                    Group Info
                </h1>
            </div>
        )
    }
}