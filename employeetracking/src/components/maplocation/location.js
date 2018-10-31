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

