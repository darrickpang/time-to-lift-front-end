import React from 'react';
import MyMapComponent from './GooglePlaces'
// https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications

const mapStyles = {
    map: {
        position: 'absolute',
        width: '50%',
        height: '50%'
    }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
  
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
    }

    renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                <MyMapComponent currentLocation={this.state.currentLocation}/>
                {this.renderChildren()}
            </div>
        );
    }
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 37.43247,
        lng: 121.8676
    },
    centerAroundCurrentLocation: false,
    visible: true
};