import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper  }  from 'google-maps-react';


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
            searcbox: '',
            latitude : this.props.latitude , 
            longitude : this.props.longitude
        };

    }

    componentWillReceiveProps(nextprops){
        let updateoptns = Object.assign({},this.state);
        updateoptns['latitude'] = nextprops.latitude;
        updateoptns['longitude'] = nextprops.longitude; 
        this.setState(updateoptns);
    }

    render() {
        return (
                <Map 
                    google={this.props.google}
                    initialCenter={{
                        lat: (this.props.latitude) ? this.props.latitude : 24.899038,
                        lng: (this.props.longitude) ? this.props.longitude : 67.168549
                    }}
                    center={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                    }}                    
                    zoom={16}
                    mapTypeControl={false}
                    gestureHandling="greedy">
                    <Marker
                        name={'Current location'} 
                        position={
                            {
                                lat: this.state.latitude, 
                                lng: this.state.longitude
                            }
                        }
                    />

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
    apiKey: ('AIzaSyDqw8C0Hb0o8jOp3EyyHurTM-erZjWddlo'),
    LoadingContainer: LoadingContainer
})(MapContainer)

// apiKey: ('AIzaSyCetrwl6BIEBZjddEkR804Fi_cNlHBKnyI'),
