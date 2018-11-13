import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import userimg from '../../images/user-icon.png';
import cardImage from '../../images/cardImage.svg';


// css files
import './dashboard.css';

//services
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser } from '../../services/employee.service';
import { getGroups , getAllGroups } from '../../services/group.service'

// components
import Header from '../header/header';

//models
import { PagesName } from '../../model/pagesname'

let PagesRoutes = new PagesName();

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userinfo: {},
            prntbtnact: false,
            groups: []
        }
    }







    componentDidMount() {
        let userId = getkey_data({ 'KeyName': 'Id' })

        if (userId) {
            checkuser(userId)
                .then(res => {
                    this.setState({
                        userinfo: res.val()
                    })
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.val()) })
                })
            this.getgroups(userId)
        } else this.props.history.push('/login')
    }


    btnsslider() {
        $(".btns-grp").slideToggle("slow");
        $(this).toggleClass("active");
        if (this.state.prntbtnact) this.setState({ prntbtnact: false });
        else this.setState({ prntbtnact: true });
    }

    /**************
     * get groups 
     **************/
    getgroups(id) {
        getAllGroups(id)
            .then(res => {
                if (res) {
                    let _updategroups = Object.assign({}, this.state);
                    _updategroups['groups'] = res;
                    this.setState(_updategroups);
                }
            })
    }


    openGroupProfile(Key , PageName){ this.props.history.push('/'+PagesRoutes[PageName]+'/'+Key); }

    render() {

        return (
            <div className="prnt-dashboard">
                <Header getHistory={this.props} />
                <div className="row prnt-dsh">
                    <div className="container-fluid ">
                        <div className="col-lg-7 col-md-7 col-sm-8">
                            <div className="rcnt-acts">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <p className="rcnt-hd"> Recent Activities </p>
                                    </div>
                                    <div className="col-md-6 col-sm-6" align="right">
                                        <button className="view-detail">View Detail</button>
                                    </div>
                                </div>

                                {/* recent logged list detail */}
                                <div className="list-cls">
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedOut'><img src={userimg} alt="user image" className="usr-img" /></div>
                                        </li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <div className='userloggedIn'><img src={userimg} alt="img" className="usr-img" /></div>
                                        </li>
                                        <li>Atta Ur Rehman</li>
                                        <li>Malir Halt , Karachi</li>
                                        <li>21 Sep, 2018 2:30PM</li>
                                    </ul>
                                    <ul>
                                        <li> <div className='userloggedOut'><img src={userimg} alt="img" className="usr-img" /></div></li>
                                        <li>Haseeb Ur Rehman</li>
                                        <li>Johar Mor , Karachi</li>
                                        <li>19 Sep, 2018 2:30PM</li>
                                    </ul>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-4">
                            <div className="grps-cls">
                                <p className="grps-hd">Groups</p>
                                {/* recent groups list detail */}
                                <div className="row">
                                    {(this.state.groups && this.state.groups.length) ?
                                        this.state.groups.map(item => {
                                            return (
                                                <div className="col-md-6 mouse-cursor" onClick={ this.openGroupProfile.bind(this , item['key'] , 'GroupDetail' ) }>
                                                    <div className="card" >
                                                        {   (item['Image'])?
                                                            <img className="card-img-top" src={ item['Image'] } alt="Card image cap" />
                                                            :<img className="card-img-top" src={cardImage} alt="Card image cap" />}
                                                        <div className="card-body">
                                                            <p className="card-grp-hd">Name : { item['FullName'] } </p>
                                                            <div className="row">
                                                                <div className="col-md-6 col-sm-6">
                                                                    <p className="card-grp-cntnt"> created by </p>
                                                                    <p className="card-grp-cntnt"> { this.state.userinfo['FullName'] } </p>

                                                                </div>
                                                                <div className="col-md-6 col-sm-6 card-grp-crtd-brdr">
                                                                    <p className="card-grp-cntnt"> 21 Sep, 2016</p>
                                                                    <p className="card-grp-cntnt"> 04:53 PM</p>
                                                                </div>
                                                            </div>
                                                            {/* <div className="card-grp-crtd-img" align="center">
                                                                <img src={ this.state.userinfo['ImageUrl'] } alt="user image" />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <div align="center"> No Record Found </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prnt-btns-grp">
                    {
                        (this.state.prntbtnact) ?
                            <i className="fa fa-minus mouse-cursor" onClick={this.btnsslider.bind(this)}></i> :
                            <i className="fa fa-plus mouse-cursor" onClick={this.btnsslider.bind(this)}></i>
                    }
                </div>
                {
                    (this.state.prntbtnact) ?
                        <div className="btns-grp">
                            <Link to="/create-group"><i className="fa fa-users mouse-cursor" title="Create Group" ></i></Link>
                            <Link to="/search-group"><i className="fa fa-search mouse-cursor" title="Search Group"></i></Link>
                            <Link to="/delete-group"><i className="fa fa-trash mouse-cursor" title="Delete Group"></i></Link>
                        </div> : null
                }

            </div>
        )
    }
}

export default Dashboard