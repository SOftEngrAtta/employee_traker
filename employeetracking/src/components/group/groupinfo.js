import React, { Component } from 'react';

//images 
import cardImg from '../../images/cardImage.svg';
import userIcon from '../../images/user-icon.png';


//components 
import Header from '../header/header';

//services 
import { getkey_data, setkey_data } from '../../services/storage.service';
import { checkuser, uploadImageDB } from '../../services/employee.service';
import { getGroupInfo, groupUpdateInfo , modifiedGroups } from '../../services/group.service';

//models
import { GroupDetailObj } from '../../model/groupdetail';
import { PagesName } from '../../model/pagesname';

// shared
import DisplayMessage, { ErrorMessage, SuccessMessage } from '../../shared/responsemsg';

//css
import './group.css';

let PagesRoutes = new PagesName();

export default class GroupInfo extends Component {

    constructor() {
        super()
        this.state = Object.assign({ userinfo: {}, file: '', imagePreviewUrl: '' , Request:[] }, GroupDetailObj)
    }

    componentDidMount() {
        let userId = getkey_data({ 'KeyName': 'Id' })
        if (userId) {
            checkuser(userId)
                .subscribe(res => {
                    let updateState = Object.assign({}, this.state);
                    updateState['userinfo'] = res.snapshot.val();
                    this.setState(updateState)
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(res.snapshot.val()) })
                })
            this.getgroup(userId);
        } else this.props.history.push('/login')
    }

    getgroup(Id) {
        getGroupInfo(Id, this.props.match.params.id)
            .subscribe(res => {
                
                let groupsInfo = res.snapshot.val()
                if(groupsInfo){
                    let updateGropInfo = Object.assign({}, this.state);
                    for (let key in updateGropInfo) {
                        if (key != "userinfo" && groupsInfo[key]) updateGropInfo[key] = groupsInfo[key];
                        if (!updateGropInfo['Id']) updateGropInfo['Id'] = this.props.match.params.id;
                    }
                    this.setState(updateGropInfo);
                }
            })
    }


    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            let updateInfo = Object.assign({}, this.state);
            updateInfo['file'] = file;
            updateInfo['imagePreviewUrl'] = reader.result;
            this.setState(updateInfo);
        }

        reader.readAsDataURL(file)
    }

    changePage(key) { this.props.history.push('/' + PagesRoutes[key]); }

    _handleInputField(field, event) {
        let updateInfo = Object.assign({}, this.state);
        updateInfo[field] = event.target.value;
        this.setState(updateInfo)
    }


    groupUpdate() {
        if (this.state.file) {
            uploadImageDB(this.state.file)
                .then(res => {
                    let updateinfo = Object.assign({}, this.state);
                    updateinfo['Image'] = res;
                    this.setState(updateinfo);
                    SuccessMessage('Group image uploaded , now data is saving ')
                    this.updateGroupInfo()
                })
        } else this.updateGroupInfo();
    }

    updateGroupInfo() {
        let updateObj = Object.assign({}, this.state);
        delete updateObj['userinfo'];
        groupUpdateInfo(updateObj)
            .then(res => {
                SuccessMessage('Group profile updated successfully');
            })
    }


    approveRequest(user){
        let updateObj = Object.assign({},this.state);
        if(!updateObj['Address']){
            ErrorMessage('please update group profile first');
            return false;
        }
        updateObj['Users'].push(user['Id']);
        for(let i=0;i< updateObj['Request'].length; i++){
            if(updateObj['Request'][i]['Id'] == user['Id']){
                updateObj['Request'][i]['status'] = 'approved';
            }
        }
        this.setState(updateObj)
        groupUpdateInfo(updateObj)
        .then(res=>{
            SuccessMessage('request accepted successfully');
            let userId = getkey_data({ 'KeyName': 'Id' })
            this.getgroup(userId);
        })
    }

    rejectRequest(user){
        let updateObj = Object.assign({},this.state);
        if(!updateObj['Address']){
            ErrorMessage('please update group profile first');
            return false;
        }
        for(let i = 0 ; i < updateObj['Request'].length ; i++ ){
            if( updateObj['Request'][i]['Id'] == user['Id'] ) updateObj['Request'].splice(i,1)
        }
        this.setState(updateObj)
        groupUpdateInfo(updateObj)
        .then(res=>{
            SuccessMessage('request rejected successfully');
            let userId = getkey_data({ 'KeyName': 'Id' })
            this.getgroup(userId);
        })
    }

    render() {

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) $imagePreview = (<img src={imagePreviewUrl} className="imgprofile" />);
        else $imagePreview = (<img src={(this.state.Image) ? this.state.Image : cardImg} alt="img" className="imgprofile" />)

        return (
            <div>
                <DisplayMessage timeduration={2000} />
                <Header getHistory={this.props} />
                <section >
                    <div className="profile-main">
                        <div className="mouse-cursor" onClick={this.changePage.bind(this, 'Dashboard')}><i class="fa fa-arrow-left"></i> Dashboard</div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="profile-upload">
                                    <input type="file" onChange={(e) => this._handleImageChange(e)} />
                                    {$imagePreview}
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
                                <input type="text" placeholder="Enter Ful Name" onChange={this._handleInputField.bind(this, 'FullName')} value={this.state.FullName} />
                                <span className="hint">(e.g : abc group)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Address</label>
                                <input type="text" placeholder="Address" onChange={this._handleInputField.bind(this, 'Address')} value={ this.state.Address } />
                                <span className="hint"></span>
                            </div>
                        </div>
                        <div className="sec-padding-xsmall">
                            <div className="row">
                                <div className="col-md-12 text-right frm-sbmt-btn">
                                    <button onClick={this.groupUpdate.bind(this)}>Submit</button>
                                </div>
                            </div>
                        </div>
                        { (this.state['Request'] && this.state['Request'].length) ?
                            this.state.Request.map(item => {
                                
                                return (
                                    (item['status'] != 'approved')?
                                    <div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {
                                                            ( item['Image'])?
                                                            <img src={ item['Image'] } />:
                                                            <img src={ userIcon } />
                                                        }
                                                    </td>
                                                    <td>
                                                        <span>
                                                            { item['FullName'] }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="accept mouse-cursor" onClick={ this.approveRequest.bind(this , item) }>Accept</span>
                                                    </td>
                                                    <td>
                                                        <span className="reject mouse-cursor" onClick={ this.rejectRequest.bind(this , item)}>Reject</span>
                                                    </td>                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>:null)
                            }) : null
                        }
                    </div>
                </section>
            </div>
        )
    }
}