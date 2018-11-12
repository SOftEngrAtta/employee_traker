import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import xml2js from 'xml2js';
// import images file
import profileimg from '../../images/user-icon.png';

// import services 
import { uploadImageDB, checkuser } from '../../services/employee.service';
import { setkey_data } from '../../services/storage.service';

// components 
import Header from '../header/header';
import MapLocation from '../maplocation/location';

// css files
import './profile.css';

// services
import { updateprofiledata } from '../../services/employee.service';
import { findlocation } from '../../services/map.service'

// shared files
import DisplayMessage, { ErrorMessage, SuccessMessage } from '../../shared/responsemsg';

// models 
import { ProfileFields } from '../../model/userprofile'
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent';
import { PagesName } from '../../model/pagesname'

var userinfo = {}; // user data variable { FullName : '' , Age : '' , EmailAddress : '' , ContactNo: 0, Address : ''}

let PagesRoutes = new PagesName();
export default class UserProfile extends Component {



    constructor(props) {

        super(props);
        this.state = Object.assign({}, ProfileFields);
        userinfo = Object.assign({}, this.state.info);
        this.getlocation = this.getlocation.bind(this);
        this.showPosition = this.showPosition.bind(this);

    }

    componentDidMount() {
        userinfo['Id'] = this.props.match.params.id;
        checkuser(userinfo['Id'])
            .then(res => {
                userinfo['FullName'] = (res.val() && res.val().FullName) ? res.val().FullName : '';
                userinfo['Age'] = (res.val() && res.val().Age) ? res.val().Age : 0;
                userinfo['ContactNo'] = (res.val() && res.val().ContactNo) ? res.val().ContactNo : '';
                userinfo['EmailAddress'] = (res.val() && res.val().EmailAddress) ? res.val().EmailAddress : '';
                userinfo['ImageUrl'] = (res.val() && res.val().ImageUrl) ? res.val().ImageUrl : '';
                userinfo['Address'] = (res.val() && res.val().Address) ? res.val().Address : '';
                userinfo['Location']['latitude'] = (res.val() && res.val().Location && res.val().Location.latitude) ? res.val().Location.latitude : '';
                userinfo['Location']['longitude'] = (res.val() && res.val().Location && res.val().Location.longitude) ? res.val().Location.longitude : '';

                this.setState({ info: userinfo })
            })
        this.getlocation();

    }

    getlocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { ErrorMessage('Geolocation is not supported by this browser.') }
    }

    showPosition(position) {
        if (userinfo['Location'] && userinfo['Location']['latitude'] && userinfo['Location']['longitude']) {
            console.log('user location updated already');
        } else {
            userinfo['Location']['latitude'] = position.coords.latitude;
            userinfo['Location']['longitude'] = position.coords.longitude;
        }

        this.setState({ info: userinfo })
    }

    _handleInputField(field, event) {
        if (field == 'longitude' || field == 'latitude') {
            userinfo['Location'][field] = event.target.value;
        } else userinfo[field] = event.target.value;
        this.setState({ info: userinfo })
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

    updateprofile() {

        if (this.state.file) {
            uploadImageDB(this.state.file)
                .then(res => {
                    userinfo['ImageUrl'] = res
                    this.setState({ info: userinfo });
                    return updateprofiledata(this.state.info);
                })
                .then(res => {
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(this.state.info) })
                    SuccessMessage('Profile Uploaded Successfully');
                }, error => {
                    if (error && error.message) ErrorMessage('Error: ' + error.message);
                    else ErrorMessage('something went wrong');
                })
        } else {
            updateprofiledata(this.state.info)
                .then(res => {
                    setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(this.state.info) })
                    SuccessMessage('Profile Uploaded Successfully');
                }, error => {
                    if (error && error.message) ErrorMessage('Error: ' + error.message);
                    else ErrorMessage('something went wrong');
                })
        }

    }

    updateMapSearchBoxField(event) {
        let _profilefiels = Object.assign({}, this.state);
        _profilefiels['lctnApi']['userinput'] = event.target.value;
        this.setState(_profilefiels)
    }

    findPlace() {
        if (this.state.lctnApi.userinput) {
            findlocation(this.state.lctnApi.userinput)
                .then(res => {
                    let placeLatLong = { lat: 0, lng: 0 };
                    if (res) {
                        xml2js.parseString(res.data, (err, _res) => {
                            if (_res.PlaceSearchResponse.status[0] == "OVER_QUERY_LIMIT") {
                                alert('please check your map api billing over query limit')
                                return false;
                            }else
                            if(_res.PlaceSearchResponse.status[0] == "ZERO_RESULTS"){
                                alert('sorry place not found');
                                return false;     
                            }else{
                                placeLatLong.lat = parseFloat(_res.PlaceSearchResponse.result[0]['geometry'][0]['location'][0]['lat'][0]);
                                placeLatLong.lng = parseFloat(_res.PlaceSearchResponse.result[0]['geometry'][0]['location'][0]['lng'][0]);
                            }

                        })
                    } else alert('sorry place not found');

                    if(placeLatLong.lat && placeLatLong.lng){
                        let _profilefiels = Object.assign({}, this.state);
                        _profilefiels['info']['Location']['latitude'] = placeLatLong.lat;
                        _profilefiels['info']['Location']['longitude'] = placeLatLong.lng;
                        this.setState(_profilefiels)
                    }


                })
        }
    }

    locationSaved(){
        updateprofiledata(this.state.info)
        .then(res => {
            setkey_data({ 'KeyName': 'customerinfo', 'KeyData': JSON.stringify(this.state.info) })
            SuccessMessage('Profile Uploaded Successfully');
        }, error => {
            if (error && error.message) ErrorMessage('Error: ' + error.message);
            else ErrorMessage('something went wrong');
        })
    }

    changePage(key){ this.props.history.push('/'+PagesRoutes[key]); }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        let value = 'apple';

        if (imagePreviewUrl) $imagePreview = (<img src={imagePreviewUrl} className="imgprofile" />);
        else $imagePreview = (<img src={(this.state.info.ImageUrl) ? this.state.info.ImageUrl : profileimg} alt="img" className="imgprofile" />)


        return (
            <div>
                <DisplayMessage timeduration={2000} />
                <Header getHistory={this.props} />
                <section >
                    <div className="profile-main">
                        <div className="mouse-cursor" onClick={ this.changePage.bind(this , 'Dashboard') }><i class="fa fa-arrow-left"></i> Dashboard</div>
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
                                <input type="text" placeholder="Enter Ful Name" onChange={this._handleInputField.bind(this, 'FullName')} value={this.state.info.FullName} />
                                <span className="hint">(e.g : john)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Age</label>
                                <input type="text" placeholder="Enter Age" onChange={this._handleInputField.bind(this, 'Age')} value={this.state.info.Age} />
                                <span className="hint">(e.g : 23)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Email Address</label>
                                <input value={this.state.info.EmailAddress} disabled />
                                <span className="hint">(e.g : abc@gmail.com)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Contact No</label>
                                <input type="text" placeholder="Enter Contact No" onChange={this._handleInputField.bind(this, 'ContactNo')} value={this.state.info.ContactNo} />
                                <span className="hint">(e.g : 111222111)</span>
                            </div>
                            <div className="col-md-12">
                                <label>Address</label>
                                <input type="text" placeholder="Address" onChange={this._handleInputField.bind(this, 'Address')} value={this.state.info.Address} />
                                <span className="hint"></span>
                            </div>
                            {/* <div className="col-md-6">
                                <label>Latitude</label>
                                <input value={this.state.info.Location.latitude} disabled />
                                <span className="hint">(e.g : 24.656)</span>
                            </div>
                            <div className="col-md-6">
                                <label>Longitude</label>
                                <input value={this.state.info.Location.longitude} disabled />
                                <span className="hint">(e.g : 65.698)</span>
                            </div> */}

                        </div>
                        <div className="sec-padding-xsmall">
                            <div className="row">
                                <div className="col-md-12 text-right frm-sbmt-btn">
                                    <button onClick={this.updateprofile.bind(this)}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className='autocomplete-search bordertop'>
                            <input placeholder="enter place name...." type="text" onChange={this.updateMapSearchBoxField.bind(this)} autoComplete="off" />
                            <button className="find-lctn" onClick={this.findPlace.bind(this)}>Find Location</button>
                        </div>
                        {
                            (this.state.info.Location.latitude && this.state.info.Location.longitude) ?
                                <div className="row map-cls" align="center">
                                    <MapLocation latitude={this.state.info.Location.latitude} longitude={this.state.info.Location.longitude} />
                                </div>
                                : null
                        }
                        {
                            ( this.state.info.Location.latitude && this.state.info.Location.longitude)?
                            <div class="usr-lct-sv-btn" align="center">
                                <button className="btnmain" onClick={ this.locationSaved.bind(this) }>Save Location</button>
                            </div>:null 
                        }

                    </div>

                </section>
            </div>
        )
    }
}
