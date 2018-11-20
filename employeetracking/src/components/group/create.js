import React, { Component } from 'react';

// bootstrap
import { Button } from 'react-bootstrap/lib';
import userimg from '../../images/user-icon.png';
import cardImage from '../../images/cardImage.svg';

// css files 
import './group.css';

//services 
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser } from '../../services/employee.service'

//components 
import Header from '../header/header';

//services 
import { groupCreate  , deleteGroupRecord , getAllGroups , modifiedGroupsByUserId } from '../../services/group.service';

//models
import { GroupData } from '../../model/group';
import { PagesName } from '../../model/pagesname';
import { ErrorMessage } from '../../shared/responsemsg';

let PagesRoutes = new PagesName();

export default class CreateGroup extends Component {



    constructor(props) {
        super(props)
        this.state = Object({ groups: []}, GroupData);
    }



    componentDidMount() {
        let userId = getkey_data({ 'KeyName': 'Id' })
        if (userId) {
            checkuser(userId)
                .subscribe(res => {
                    let _userinfo = Object.assign({}, GroupData);
                    _userinfo['userinfo'] = res.snapshot.val();
                    _userinfo['CreatedBy'] = res.snapshot.val().Id;
                    _userinfo['Admins'].push(res.snapshot.val().Id);
                    _userinfo['Users'].push(res.snapshot.val().Id);
                    this.setState(_userinfo)
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.snapshot.val()) })
                    this.groups();
                })
        } else this.props.history.push('/login')
    }

    handler(event) {
        let _groupdto = Object.assign({}, this.state);
        _groupdto['FullName'] = event.target.value;
        this.setState(_groupdto);
    }

    groups() {
        getAllGroups()
            .subscribe(res => {
                if (res) {
                    let allGroups = modifiedGroupsByUserId( res.snapshot , this.state.CreatedBy);
                    let _updategroups = Object.assign({}, this.state);
                    _updategroups['groups'] = [];
                    _updategroups['groups'] = allGroups;
                    this.setState(_updategroups);
                }
            })
    }

    createGroup() {
        
        let groupfound = this.state['groups'].find( elemnt => elemnt['FullName'].trim().toLowerCase() == this.state['FullName'].trim().toLowerCase() )
        if(groupfound){
            ErrorMessage('sorry this group name already exist');
            return false;
        }
        groupCreate(this.state)
            .then(res => {
                this.groups();
                console.log('group created successfully');
            }, err => { console.log('getting some error');})
    }

    groupDelete(key){
        deleteGroupRecord({createrId : this.state.CreatedBy , groupKey : key})
        .then(res=>{
            console.log('group deleted successfully');
            this.groups();
        })
    }

    changePage(key){ this.props.history.push('/'+PagesRoutes[key]); }

    openGroupProfile(group , PageName){ 
        let checkUser = false;
        for(let i = 0; i < group['Admins'].length ; i++ ){
            if(this.state.userinfo['Id'] == group['Admins'][i]){
                checkUser = true;
                this.props.history.push('/' + PagesRoutes[PageName] + '/' + group['key'] );     
            }
        }
        if(!checkUser) ErrorMessage('sorry you are not allow to open group profile');

        // this.props.history.push('/'+PagesRoutes[PageName]+'/'+grp['key']); 
    }

    render() {
        return (
            <div>
                <Header getHistory={this.props} />
                <div class="container">
                    <div class="row" align="center">
                        <div class="col-md-6" align="right">
                            <input class="crt-grp-cls" placeholder="Group Name" onChange={this.handler.bind(this)} />
                        </div>
                        <div class="col-md-6 crt-grp-btn-cls" align="left">
                            <Button bsStyle="success" onClick={this.createGroup.bind(this)}>Create</Button>
                        </div>
                    </div>
                </div>

                {/* group list */}
                <div class="container">
                    <div class="row grps-row-cls">
                        <div class="arw-lft-cls mouse-cursor" onClick={ this.changePage.bind(this , 'Dashboard') }><i class="fa fa-arrow-left"></i> Dashboard </div>
                        {
                            (this.state.groups && this.state.groups.length) ?
                                this.state.groups.map( (item) => {
                                    console.log(item)
                                    return (
                                        <div class="col-md-3">
                                            <div className="card" >
                                                {
                                                    ( item['Image'] ) ? 
                                                    <img className="card-img-top" src={ item['Image'] } alt="Card image cap" /> :
                                                    <img className="card-img-top" src={ cardImage } alt="Card image cap" />
                                                }
                                                <div className="card-body">
                                                    <p className="card-grp-hd">
                                                        { item['FullName'] }
                                                        <i class="fa fa-edit mouse-cursor" onClick={ this.openGroupProfile.bind(this , item , 'GroupDetail' ) }></i>
                                                        <i class="fa fa-trash mouse-cursor" title="Delete Group" onClick={ this.groupDelete.bind(this, item['key']) }></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <div> No Record Found </div>
                        }
                    </div>
                </div>

            </div>
        )
    }
} 