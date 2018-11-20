import React, { Component } from 'react';
import { Button } from 'react-bootstrap/lib';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';

import userimg from '../../images/user-icon.png';
import cardImage from '../../images/cardImage.svg';

// components 
import Header from '../header/header';

//services 
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser } from '../../services/employee.service'
import { getAllGroups, deleteGroupRecord , modifiedGroupsByUserId } from '../../services/group.service';

// models 
import { GroupData } from '../../model/group'
import { PagesName } from '../../model/pagesname'

// shared files
import DisplayMessage, { ErrorMessage, SuccessMessage } from '../../shared/responsemsg';

// css file 
import './group.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';

let PagesRoutes = new PagesName();
export default class DeleteGroup extends Component {

    constructor(props) {
        super(props)
        this.state = Object({ groups: [], allgroups: [], userInput: '' }, GroupData);
    }

    componentDidMount() {
        let userId = getkey_data({ 'KeyName': 'Id' })
        if (userId) {
            checkuser(userId)
                .subscribe(res => {
                    this.setState({
                        userinfo: res.snapshot.val()
                    })
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.snapshot.val()) })
                })
            this.groups(userId);
        } else this.props.history.push('/login')
    }

    groups(Id) {
        getAllGroups()
            .subscribe(res => {
                if (res) {
                    let allGroups = modifiedGroupsByUserId( res.snapshot , Id);
                    let _updategroups = Object.assign({}, this.state);
                    _updategroups['groups'] = allGroups;
                    _updategroups['allgroups'] = allGroups;
                    this.setState(_updategroups);
                }
            })
    }

    groupDelete(key) {
        deleteGroupRecord({ createrId: this.state.userinfo.Id, groupKey: key })
            .then(res => {
                SuccessMessage("group deleted successfully");
                this.groups(this.state.userinfo['Id']);
            })
    }

    handlerInput(event){
        if(event && event.length){
            let groupsDt = this.state;
            groupsDt['groups'] = [groupsDt['allgroups'].find( elmnt => event[0]['FullName'].toLowerCase() == elmnt['FullName'].toLowerCase() )]
            this.setState(groupsDt);
        }else {
            let groupDt = this.state ;
            groupDt['groups'] = groupDt['allgroups'];
            this.setState(groupDt)
        }
    }

    changePage(key){ this.props.history.push('/'+PagesRoutes[key]); }

    openGroupProfile(Key , PageName){ this.props.history.push('/'+PagesRoutes[PageName]+'/'+Key); }
    
    render() {
        return (
            <div>
                <DisplayMessage timeduration={2000} />
                <Header getHistory={this.props} />
                <div class="container">
                    <div class="row" align="center">
                        <div class="col-md-10" >
                            <div class="prnt-inpt-fld">
                                <Typeahead
                                    labelKey="FullName"
                                    options={ this.state.groups }
                                    placeholder="Enter Group Name ...."
                                    onChange={ this.handlerInput.bind(this) }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* group list */}
                <div class="container">
                        
                    <div class="row grps-row-cls">
                        <div class="arw-lft-cls mouse-cursor" onClick={ this.changePage.bind(this , 'Dashboard') }><i class="fa fa-arrow-left"></i> Dashboard </div>
                        {
                            (this.state.groups && this.state.groups.length) ?
                                this.state.groups.map((item) => {
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
                                                        {item['FullName']}
                                                        <i class="fa fa-edit mouse-cursor" onClick={ this.openGroupProfile.bind(this , item['key'] , 'GroupDetail' ) }></i>
                                                        <i class="fa fa-trash mouse-cursor" title="Delete Group" onClick={this.groupDelete.bind(this, item['key'])}></i>
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