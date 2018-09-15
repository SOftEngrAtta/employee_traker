import React , { Component } from 'react';

// components 
import Header from '../header/header';

export default class UserProfile extends Component{
    
    updateprofile(){ console.log('profile upload functionality'); }

    render(){

        

        return(
            <div>
                <Header />
                <button onClick={ this.updateprofile.bind(this) }>Update Profile</button> 
            </div>
        )
    }
}
