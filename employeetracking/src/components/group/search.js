import React, { Component } from 'react';

// import components 
import Header from '../header/header';

//services 
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser } from '../../services/employee.service'
import { getAllGroups, modifiedGroups } from '../../services/group.service'

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
                .then(res => {
                    let updateObj = Object.assign({}, this.state);
                    updateObj['userInfo'] = res.val();
                    this.setState(updateObj);
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.val()) })
                    this.groups()
                })
        } else this.props.history.push('/login')
    }

    groups() {

        getAllGroups()
            .subscribe(res => {

                let _groups = modifiedGroups(res.snapshot)
                debugger
                let finalGroups = []
                if(_groups && _groups.length){
                    _groups.forEach( item => { 
                        item['Admins'].forEach( _item =>  {
                            console.log(this.state)
                            if(this.state['userInfo']['Id'] != _item){ 
                                finalGroups.push(item) 
                            } 
                        })
                    })
                    console.log('finalGroups ==> ',finalGroups)
                    let updateObj = Object.assign({}, this.state);
                    _groups.forEach(item=> item['activeReq'] = 'none' )
                    updateObj['groups'] = finalGroups;
                    updateObj['allGroups'] = finalGroups;
                    this.setState(updateObj);
                
                }
                
            })
    }

    reqHit(index){
        let updateObj = Object.assign({},this.state);
        if(updateObj['groups'][index]['activeReq'] == 'none' ) {
            updateObj['groups'][index]['activeReq'] = 'in-process'
        }else if(updateObj['groups'][index]['activeReq'] == 'in-process' || updateObj['groups'][index]['activeReq'] == 'approved'){
            updateObj['groups'][index]['activeReq'] = 'none'
        }
        this.setState(updateObj);
    }


    changePage(key){ this.props.history.push('/'+PagesRoutes[key]); }

    render() {

        return (
            <div>
                <Header getHistory={this.props} />
                {/* group list */}
                <div class="container">

                    <div class="row grps-row-cls">
                        <div class="arw-lft-cls mouse-cursor" onClick={this.changePage.bind(this, 'Dashboard')}><i class="fa fa-arrow-left"></i> Dashboard </div>
                        {
                            (this.state.groups && this.state.groups.length) ?
                                this.state.groups.map((item , index) => {
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
                                                    <span className={ item['activeReq']  } onClick={ this.reqHit.bind(this , index)}>
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