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
import { groupCreateUpdate, getGroups , deleteGroupRecord , getAllGroups } from '../../services/group.service';

//models
import { GroupData } from '../../model/group';
import { PagesName } from '../../model/pagesname';

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
                .then(res => {
                    let _userinfo = Object.assign({}, GroupData);
                    _userinfo['userinfo'] = res.val();
                    _userinfo['CreatedBy'] = res.val().Id;
                    _userinfo['Admins'].push(res.val().Id);
                    _userinfo['Users'].push(res.val().Id);
                    this.setState(_userinfo)
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.val()) })
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
        getAllGroups(this.state.CreatedBy)
            .then(res => {
                if (res) {
                    let _updategroups = Object.assign({}, this.state);
                    _updategroups['groups'] = [];
                    _updategroups['groups'] = res;
                    this.setState(_updategroups);
                }
            })
    }

    createGroup() {
        
        let groupfound = this.state['groups'].find( elemnt => elemnt['FullName'].trim().toLowerCase() == this.state['FullName'].trim().toLowerCase() )
        if(groupfound){
            alert('sorry this group name already exist');
            return false ;
        }
        groupCreateUpdate(this.state)
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

    openGroupProfile(Key , PageName){ this.props.history.push('/'+PagesRoutes[PageName]+'/'+Key); }

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
                                                        <i class="fa fa-edit mouse-cursor" onClick={ this.openGroupProfile.bind(this , item['key'] , 'GroupDetail' ) }></i>
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