import React, { Component } from 'react';
import { GoogleApiWrapper, Marker }  from 'google-maps-react';
import CurrentLocation from '../components/Map';
// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
  
    render() {
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
                <Marker onClick={this.onMarkerClick} name={'current location'} />
               
            </CurrentLocation>
        );
    }
}
  
export default GoogleApiWrapper({
    // apiKey: 
})(MapContainer);