import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import images file
import profileimg from '../../images/user-icon.png';

// import services 
import { uploadImageDB, checkuser } from '../../services/employee.service';
import { setkey_data } from '../../services/storage.service';

// components 
import Header from '../header/header';
import MapLocation from '../maplocation/location';
import './profile.css'
import { updateprofiledata } from '../../services/employee.service';
import DisplayMessage, { ErrorMessage, SuccessMessage } from '../../shared/responsemsg';

var userinfo = {} ; // user data variable { FullName : '' , Age : '' , EmailAddress : '' , ContactNo: 0, Address : ''}

export default class UserProfile extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            info: {
                Id : '',
                FullName: '',
                Age: 0,
                EmailAddress: '',
                ContactNo: 0,
                Address: '',
                ImageUrl : '' 
            }
        };
        userinfo = Object.assign({},this.state.info);
    }

    componentDidMount(){
        userinfo['Id'] = this.props.match.params.id;
        checkuser(userinfo['Id'])
        .then(res=>{
            userinfo['FullName'] = (res.val() && res.val().FullName)?res.val().FullName:'';
            userinfo['Age'] = (res.val() && res.val().Age)?res.val().Age:0;
            userinfo['ContactNo'] = (res.val() && res.val().ContactNo)?res.val().ContactNo:'';
            userinfo['EmailAddress'] = (res.val() && res.val().EmailAddress)?res.val().EmailAddress:'';
            userinfo['ImageUrl'] = (res.val() && res.val().ImageUrl)?res.val().ImageUrl:'';
            userinfo['Address'] = (res.val() && res.val().Address)?res.val().Address:'';
            this.setState({info : userinfo})
        })

    }

    _handleInputField(field , event) { 
        userinfo[field] = event.target.value;
        this.setState({ info : userinfo })
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    updateprofile(){
        uploadImageDB(this.state.file)
        .then(res=>{
            userinfo['ImageUrl'] = res
            this.setState({info : userinfo});
            return updateprofiledata(this.state.info);
        })
        .then(res=>{
            setkey_data({ 'KeyName' : 'customerinfo','KeyData' : JSON.stringify(this.state.info) })
            SuccessMessage('Profile Uploaded Successfully');
        },error=>{
            if(error && error.message) ErrorMessage('Error: '+error.message);
            else ErrorMessage('something went wrong');
        })
    }

    render() {
        let { imagePreviewUrl } = this.state;

        let $imagePreview = null;
        if (imagePreviewUrl) $imagePreview = (<img src={imagePreviewUrl} className="imgprofile" />);
        else $imagePreview = (<img src={( this.state.info.ImageUrl )? this.state.info.ImageUrl : profileimg} alt="img" className="imgprofile" />)


        return (
            <div>
                <DisplayMessage timeduration={ 2000 }/>
                <Header getHistory={this.props}/>
                <section >
                    <div className="profile-main">
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
                                <input type="text" placeholder="Enter Ful Name" onChange={this._handleInputField.bind(this , 'FullName')} value={this.state.info.FullName}/>
                                <span className="hint">(e.g : john)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Age</label>
                                <input type="text" placeholder="Enter Age" onChange={this._handleInputField.bind(this , 'Age')} value={this.state.info.Age} />
                                <span className="hint">(e.g : 23)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Email Address</label>
                                <input type="email" placeholder="Enter Email address" onChange={this._handleInputField.bind(this , 'EmailAddress')} value={ this.state.info.EmailAddress } disabled/>
                                <span className="hint">(e.g : abc@gmail.com)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Contact No</label>
                                <input type="text" placeholder="Enter Contact No" onChange={ this._handleInputField.bind(this , 'ContactNo') } value={ this.state.info.ContactNo }/>
                                <span className="hint">(e.g : 111222111)</span>
                            </div>
                            <div className="col-md-12">
                                <label>Address</label>
                                <input type="text" placeholder="Address" onChange={ this._handleInputField.bind(this , 'Address') } value={ this.state.info.Address }/>
                                <span className="hint"></span>
                            </div>
                        </div>
                        <div className="sec-padding-xsmall bordertop sec-margin-xxsmall">
                            <div className="row">
                                <div className="col-md-6 ">
                                    <Link to="/dashboard" className="sec-padding-xxsmall">Go Back.</Link>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btnmain" onClick={ this.updateprofile.bind(this) }>Submit</button> <button className="btnCancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                        <div className="row map-cls" align="center">
                            <MapLocation />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
