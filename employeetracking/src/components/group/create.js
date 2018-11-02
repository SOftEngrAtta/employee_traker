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

// import components 
import Header from '../header/header';

//services 
import { groupCreateUpdate, getGroups , deletegroup } from '../../services/group.service';

import { GroupData } from '../../model/group'


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
        getGroups(this.state.CreatedBy)
            .then(res => {
                if (res) {
                    let _updategroups = Object.assign({}, this.state);
                    _updategroups['groups'] = [];
                    res.forEach( (elem ) => {
                        let grpObj = elem.val();
                        grpObj['key'] = elem.key;
                        _updategroups['groups'].push(grpObj)
                    })
                    this.setState(_updategroups);
                }
            })
    }

    createGroup() {
        groupCreateUpdate(this.state)
            .then(res => {
                this.groups();
                console.log('group created successfully');
            }, err => { console.log('getting some error');})
    }

    groupDelete(key){
        debugger
        deletegroup({createrId : this.state.CreatedBy , groupKey : key})
        .then(res=>{
            console.log('group deleted successfully')
            this.groups();
        })
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
                            <Button bsStyle="success" onClick={this.createGroup.bind(this)}>Create Group</Button>
                        </div>
                    </div>
                </div>

                {/* group list */}
                <div class="container">
                    <div class="row grps-row-cls">
                        {
                            (this.state.groups && this.state.groups.length) ?
                                this.state.groups.map( (item) => {
                                    console.log(item)
                                    return (
                                        <div class="col-md-3">
                                            <div className="card" >
                                                <img className="card-img-top" src={cardImage} alt="Card image cap" />
                                                <div className="card-body">
                                                    <p className="card-grp-hd">
                                                        { item['FullName'] }
                                                        <i class="fa fa-edit"></i>
                                                        <i class="fa fa-trash" onClick={ this.groupDelete.bind(this, item['key']) }></i>
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