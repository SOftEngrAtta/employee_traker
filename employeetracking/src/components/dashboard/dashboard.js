import React, { Component } from 'react';
import userimg from '../../images/user-icon.png';
import cardImage from '../../images/cardImage.svg';


// css files
import './dashboard.css';

//service files 
import { verifyuser } from '../../services/authentication.service';

// components
import Header from '../header/header';


class Dashboard extends Component {


    componentDidMount() {
        verifyuser();
    }

    render() {
        return (
            <div className="prnt-dashboard">
                <Header />
                <div className="row prnt-dsh">
                    <div className="container-fluid ">
                        <div className="col-md-7">
                            <div className="rcnt-acts">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="rcnt-hd"> Recent Activities </p>
                                    </div>
                                    <div className="col-md-6" align="right">
                                        <button class="view-detail">View Detail</button>
                                    </div>
                                </div>

                                {/* recent logged list detail */}
                                <div class="list-cls">
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} alt="user image"/></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li> <div className='userloggedOut'><img src={userimg} /></div></li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>

                                </div>

                            </div>
                        </div>
                        <div className="col-md-4 col-offset-md-1">
                            <div className="grps-cls">
                                <p className="grps-hd">Groups</p>
                                {/* recent groups list detail */}
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="card" >
                                            <img className="card-img-top" src={ cardImage } alt="Card image cap" />
                                            <div className="card-body">
                                                <p className="card-grp-hd">Name : ABC Group</p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-grp-cntnt"> created by </p>
                                                        <p className="card-grp-cntnt"> atta ur rehman </p>
                                                        
                                                    </div>
                                                    <div className="col-md-6 card-grp-crtd-brdr">
                                                        <p className="card-grp-cntnt"> 21 Sep, 2016</p>
                                                        <p className="card-grp-cntnt"> 04:53 PM</p>
                                                    </div>
                                                </div>
                                                <div className="card-grp-crtd-img" align="center">
                                                    <img src={ userimg } alt="user image"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card" >
                                            <img className="card-img-top" src={ cardImage } alt="Card image cap" />
                                            <div className="card-body">
                                                <p className="card-grp-hd">Name : ABC Group</p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-grp-cntnt"> created by </p>
                                                        <p className="card-grp-cntnt"> atta ur rehman </p>
                                                        
                                                    </div>
                                                    <div className="col-md-6 card-grp-crtd-brdr">
                                                        <p className="card-grp-cntnt"> 21 Sep, 2016</p>
                                                        <p className="card-grp-cntnt"> 04:53 PM</p>
                                                    </div>
                                                </div>
                                                <div className="card-grp-crtd-img" align="center">
                                                    <img src={ userimg } alt="user image"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card" >
                                            <img className="card-img-top" src={ cardImage } alt="Card image cap" />
                                            <div className="card-body">
                                                <p className="card-grp-hd">Name : ABC Group</p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-grp-cntnt"> created by </p>
                                                        <p className="card-grp-cntnt"> atta ur rehman </p>
                                                        
                                                    </div>
                                                    <div className="col-md-6 card-grp-crtd-brdr">
                                                        <p className="card-grp-cntnt"> 21 Sep, 2016</p>
                                                        <p className="card-grp-cntnt"> 04:53 PM</p>
                                                    </div>
                                                </div>
                                                <div className="card-grp-crtd-img" align="center">
                                                    <img src={ userimg } alt="user image"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card" >
                                            <img className="card-img-top" src={ cardImage } alt="Card image cap" />
                                            <div className="card-body">
                                                <p className="card-grp-hd">Name : ABC Group</p>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="card-grp-cntnt"> created by </p>
                                                        <p className="card-grp-cntnt"> atta ur rehman </p>
                                                        
                                                    </div>
                                                    <div className="col-md-6 card-grp-crtd-brdr">
                                                        <p className="card-grp-cntnt"> 21 Sep, 2016</p>
                                                        <p className="card-grp-cntnt"> 04:53 PM</p>
                                                    </div>
                                                </div>
                                                <div className="card-grp-crtd-img" align="center">
                                                    <img src={ userimg } alt="user image"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard