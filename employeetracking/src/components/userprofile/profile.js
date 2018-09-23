import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components 
import Header from '../header/header';
import './profile.css'
export default class UserProfile extends Component {


    render() {
        return (
            <div>
                <Header getHistory = { this.props }/>
                <section className="">
                    <div className="profile-main">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="profile-upload">
                                    <input type="file" />
                                    <img src="/images/user-icon.png" alt="" className="imgprofile" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <h3 className="upload-hd">Upload Picture</h3>
                                <p className="upload-para">Max Size 1MB</p>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter Ful Name" />
                                <span className="hint">(e.g : john)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Age</label>
                                <input type="text" placeholder="Enter Age" />
                                <span className="hint">(e.g : 23)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Email Address</label>
                                <input type="email" placeholder="Enter Email address" />
                                <span className="hint">(e.g : abc@gmail.com)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Contact No</label>
                                <input type="text" placeholder="Enter Contact No" />
                                <span className="hint">(e.g : 111222111)</span>
                            </div>
                            <div className="col-md-12">
                                <label>Address</label>
                                <input type="text" placeholder="Enter address" />
                                <span className="hint"></span>
                            </div>
                        </div>
                        <div className="sec-padding-xsmall bordertop sec-margin-xxsmall">
                            <div className="row">
                                <div className="col-md-6 ">
                                    <Link to="/dashboard" className="sec-padding-xxsmall">Go Back.</Link>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btnmain">Submit</button> <button class="btnCancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
