import React, { Component } from 'react';

// components 
import Header from '../header/header';

// services 
import { updateprofiledata } from '../../services/employee.service';


export default class UserProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userprofile: {
                Id: 1,
                FullName: 'Atta ur Rehman',
                ImageName: 'Image 1',
                Age: 2,
                EmailAddress: 'abc@gmail.com',
                Address: 'abc home',
                ContactNumber: '234234',
                HomeLocation: {
                    Latitude: '213123',
                    Longitude: '1231231'
                }
            }
        }
    }

    updateData() {
        updateprofiledata(this.state.userprofile).then(res => { console.log(res) }, error => { console.log(error) })
    }

    uploadimage(){
        uploadimagefunc()
        .then(res=>{

        },error=>{
            
        })
    }


    render() {

        return (
            <div>
                <Header />

                <button onClick={this.updateData.bind(this)}>Upload</button>
                <button onClick={this.uploadimage.bind(this)}>Upload Image</button>
            </div>
        )
    }
}
