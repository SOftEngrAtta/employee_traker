import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import userimg from '../../images/user-icon.png';
import cardImage from '../../images/cardImage.svg';

// css files
import './dashboard.css';

//services
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser , getUser } from '../../services/employee.service';
import { getGroups, getAllGroups , modifiedGroupsByUserId} from '../../services/group.service'


// components
import Header from '../header/header';

//models
import { PagesName } from '../../model/pagesname'
import { ErrorMessage } from '../../shared/responsemsg';

let PagesRoutes = new PagesName();


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userinfo: {},
            prntbtnact: false,
            groups: [],
            groupUsers: []
        }
    }

    componentDidMount() {

        let userId = getkey_data({ 'KeyName': 'Id' })

        if (userId) {
            checkuser(userId)
                .subscribe(res => {
                    let updateObj = Object.assign({},this.state);
                    updateObj['userinfo'] = res.snapshot.val();
                    this.setState(updateObj)
                    
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.snapshot.val()) })
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
        getAllGroups()
            .subscribe((res) => {
                let allgroups = modifiedGroupsByUserId(res.snapshot , id)
                let _updategroups = Object.assign({}, this.state);
                _updategroups['groups'] = allgroups;
                _updategroups['groupUsers'] = [];
                this.setState(_updategroups);
                this.getAllUsers(_updategroups['groups'] , 0)
            })
    }

    getAllUsers(grps,index){
        let updateObj = Object.assign({}, this.state);
        updateObj['groupUsers'] = [];
        this.setState(updateObj);

        if(index == grps.length){
            console.log('users received');
        }else{
            this.getUsers(grps , index)
        } 
    }

    getUsers(grps , index){
        grps[index]['Users'].map(Id=>{
            getUser(Id).subscribe(res=>{
                this.saveGrpUser(res.snapshot.val());
            })
        })
        index++;
        this.getAllUsers(grps,index);
    }
    saveGrpUser(data){
        if(data){
            let updateObj = Object.assign({},this.state);
            if(updateObj['groupUsers'] && updateObj['groupUsers'].length){
                let checkUser = false; 
                for(let i = 0 ; i < updateObj['groupUsers'].length ; i++){
                    if(updateObj['groupUsers'][i]['Id'] == data['Id']){
                        updateObj['groupUsers'][i] = data;
                        checkUser = true ;
                    }
                }
                if(!checkUser) updateObj['groupUsers'].push(data); 
            }else updateObj['groupUsers'].push(data)
            
            this.setState(updateObj);
        }
    }

    openGroupProfile(group, PageName) { 
       let checkUser = false;
        for(let i = 0; i < group['Admins'].length ; i++ ){
            if(this.state.userinfo['Id'] == group['Admins'][i]){
                checkUser = true;
                this.props.history.push('/' + PagesRoutes[PageName] + '/' + group['key'] );     
            }
        }
        if(!checkUser) ErrorMessage('sorry you are not allow to open group profile');
    }

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
                                    {
                                        (this.state.groupUsers && this.state.groupUsers.length)?
                                        this.state.groupUsers.map(item=>{
                                            return(
                                                <ul>
                                                    <li>
                                                        <div className={ (item['checkInStatus'])?'userloggedIn':'userloggedOut' }>
                                                            {
                                                                (item['ImageUrl'])?
                                                                <img src={ item['ImageUrl'] } alt="img" className="usr-img" />
                                                                :<img src={userimg} alt="img" className="usr-img" />
                                                            }
                                                        </div>
                                                    </li>
                                                    <li>{ item['FullName'] }</li>
                                                    <li>Malir Halt , Karachi</li>
                                                    <li>View Profile</li>
                                                </ul>
                                            )
                                        }):''
                                    }
                                    
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
                                                <div className="col-md-6 mouse-cursor" onClick={this.openGroupProfile.bind(this, item, 'GroupDetail' )}>
                                                    <div className="card" >
                                                        {(item['Image']) ?
                                                            <img className="card-img-top" src={item['Image']} alt="Card image cap" />
                                                            : <img className="card-img-top" src={cardImage} alt="Card image cap" />}
                                                        <div className="card-body">
                                                            <p className="card-grp-hd">Name : {item['FullName']} </p>
                                                            <div className="row">
                                                                <div className="col-md-6 col-sm-6">
                                                                    <p className="card-grp-cntnt"> Admin </p>
                                                                    <p className="card-grp-cntnt"> { item['AdminName'] } </p>

                                                                </div>
                                                                <div className="col-md-6 col-sm-6 card-grp-crtd-brdr">
                                                                    <p className="card-grp-cntnt"> Total Users</p>
                                                                    <p className="card-grp-cntnt"> 
                                                                        { item['Users'].length }
                                                                    </p>
                                                                </div>
                                                            </div>
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