import React, { Component } from 'react';

// import components 
import Header from '../header/header';

//services 
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser } from '../../services/employee.service'
import { getAllGroups, modifiedGroups, groupUpdateInfo } from '../../services/group.service'
import DisplayMessage, { ErrorMessage, SuccessMessage } from '../../shared/responsemsg';

//models
import { PagesName } from '../../model/pagesname'

//images
import cardImage from '../../images/cardImage.svg';

let PagesRoutes = new PagesName();
export default class SearchGroup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            groups: [],
            allGroups: []
        }
    }

    componentDidMount() {
        let userId = getkey_data({ 'KeyName': 'Id' })
        if (userId) {
            checkuser(userId)
                .subscribe(res => {
                    let updateObj = Object.assign({}, this.state);
                    updateObj['userInfo'] = res.snapshot.val();
                    this.setState(updateObj);
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.snapshot.val()) })
                    this.groups()
                })
        } else this.props.history.push('/login')
    }

    groups() {

        getAllGroups()
            .subscribe(res => {

                let _groups = modifiedGroups(res.snapshot)
                let finalGroups = []
                if (_groups && _groups.length) {
                    _groups.forEach(item => {
                        item['Admins'].forEach(_item => {
                            console.log(this.state)
                            if (this.state['userInfo']['Id'] != _item) {
                                finalGroups.push(item)
                            }
                        })
                    })
                    let updateObj = Object.assign({}, this.state);
                    updateObj['groups'] = []; updateObj['allGroups'] = [];
                    updateObj['groups'] = this.statusModify(finalGroups , updateObj.userInfo.Id);
                    updateObj['allGroups'] = updateObj['groups'];
                    this.setState(updateObj);
                }
            })
    }

    statusModify(grps , userId){
        let _grps = [];
        grps.forEach( item =>{
            if(item['Request'] && item['Request'].length){
                let checkUser = false;
                item['Request'].forEach(_elem => {
                    if(userId == _elem['Id'])
                    {   
                        checkUser = true ;
                        item['activeReq'] = _elem['status']
                        _grps.push(item);
                    }

                });
                if(!checkUser){
                    item['activeReq'] = 'none';
                    _grps.push(item)
                };
            }else {
                item['activeReq'] = 'none';
                _grps.push(item);
            }
        })
        return _grps
    }

    reqHit(index) {

        if(!this.state['userInfo']['FullName']) {
            ErrorMessage('please complete your profile first'); return false;
        }

        let updateObj = Object.assign({}, this.state);
        if (updateObj['groups'][index]['activeReq'] == 'none') {
            updateObj['groups'][index]['activeReq'] = 'in-process'
        } else if (updateObj['groups'][index]['activeReq'] == 'in-process' || updateObj['groups'][index]['activeReq'] == 'approved') {
            updateObj['groups'][index]['activeReq'] = 'none'
        }

        let _grp = updateObj['groups'][index];
        let hitRequest = {
            Id: updateObj['userInfo']['Id'],
            FullName: updateObj['userInfo']['FullName'],
            Image: updateObj['userInfo']['ImageUrl'],
            status: _grp['activeReq']
        }

        if (_grp['activeReq'] != 'none'){
            if(_grp['Request'] && _grp['Request'].length) _grp['Request'].push(hitRequest); 
            else  _grp['Request'] = [hitRequest]; delete _grp['activeReq']
        }else{
            _grp['Request'] = this.removeKeysFromArray(updateObj['userInfo'],_grp['Request']); 
            _grp['Users'] = this.removeKeysFromArray(updateObj['userInfo'],_grp['Users']);
            _grp['Admins'] = this.removeKeysFromArray(updateObj['userInfo'],_grp['Admins']);
        }
        
        delete _grp['userinfo'];
        
        groupUpdateInfo(_grp)
            .then(res => { SuccessMessage('request has been sent successfully');})

        this.setState(updateObj);
    }


    removeKeysFromArray(user , _array){
        for(let i = 0 ; i < _array.length ; i++){
            if(_array[i]['Id'] && _array[i]['Id'] == user['Id']){
                _array.splice(i,1);
            }else if(_array[i] == user['Id']){
                _array.splice(i,1);
            }
        }
        return _array;
    }

    changePage(key) { this.props.history.push('/' + PagesRoutes[key]); }

    render() {
        return (
            <div>
                <DisplayMessage timeduration={2000} />
                <Header getHistory={this.props} />
                {/* group list */}
                <div class="container">

                    <div class="row grps-row-cls">
                        <div class="arw-lft-cls mouse-cursor" onClick={this.changePage.bind(this, 'Dashboard')}><i class="fa fa-arrow-left"></i> Dashboard </div>
                        {
                            (this.state.groups && this.state.groups.length) ?
                                this.state.groups.map((item, index) => {
                                    return (
                                        <div class="col-md-3">
                                            <div className="card" >
                                                {
                                                    (item['Image']) ?
                                                        <img className="card-img-top" src={item['Image']} alt="Card image cap" /> :
                                                        <img className="card-img-top" src={cardImage} alt="Card image cap" />
                                                }

                                                <div className="card-body srch-grp-lst">
                                                    <p className="card-grp-hd">
                                                        Group Name: {item['FullName']}
                                                    </p>
                                                </div>
                                                <div class="hit-tick">
                                                    <span className={item['activeReq']} onClick={this.reqHit.bind(this, index)}>
                                                        <i class="fa fa-check"></i>
                                                    </span>
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