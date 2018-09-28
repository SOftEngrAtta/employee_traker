import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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
        };
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map google={this.props.google}
                initialCenter={{
                    lat: 24.899038,
                    lng: 67.168549
                }}
                zoom={13}
                onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
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

