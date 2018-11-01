import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper  }  from 'google-maps-react';
import xml2js from 'xml2js';

// services 
import { findlocation } from '../../services/map.service'


const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)
const style = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            searcbox: ''
        };
    }

    componentWillReceiveProps(newprops) {
        console.log(newprops);

        let mapfields = Object.assign({}, this.state);

        if (newprops.searchBox) {
            findlocation(newprops.searchBox)
            .then(res=>{
                debugger
                if(res){

                    xml2js.parseString(res.data,(err,_res)=>{
                        debugger                        
                        console.dir(_res);
                    })
                    // this.props.latitude = (res.latitude)?res.latitude:this.props.latitude;
                    // this.props.longitude = (res.longitude)?res.longitude:this.props.longitude;
                }else alert('sorry place not found');
            })
        }

    }

    render() {
        return (
                <Map google={this.props.google}
                    initialCenter={{
                        lat: (this.props.latitude) ? this.props.latitude : 24.899038,
                        lng: (this.props.longitude) ? this.props.longitude : 67.168549
                    }}
                    zoom={13}

                >
                    <Marker

                        name={'Current location'} />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>

        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCetrwl6BIEBZjddEkR804Fi_cNlHBKnyI'),
    LoadingContainer: LoadingContainer
})(MapContainer)

