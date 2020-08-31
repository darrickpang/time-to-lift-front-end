import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Map from '../components/Map';
import { MapContainer } from './MapContainer';

class StudentNavContainer extends React.Component {
    state = {
        modalShow: false
    }

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    renderMap = () => {
        return(
            <div>
                map
                <MapContainer />
            </div>
        )
    }

    renderSidenavOptions = () => {
        return (
            <div className="sidenav-options">
               {this.renderMap()}
            </div>
        )
    }

    render(){
        return(
            <div className="sidenav-container">
                {this.renderSidenavOptions()}
            </div>
        )}
    }

export default withRouter(StudentNavContainer)