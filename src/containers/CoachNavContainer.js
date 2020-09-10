import React from 'react';
import { withRouter } from 'react-router-dom';
import MapContainer from './MapContainer'
import CoachClassContainer from './CoachClassContainer'
import CoachCalendar from '../components/CoachCalendar'
import GymContainer from './GymContainer'
import 'react-infinite-calendar/styles.css' 

class CoachNavContainer extends React.Component {
    renderMap = () => {
        return(
            <div id="overall-map">
                <MapContainer/>
            </div>
        )
    }

    renderCoachClassContainer = (addClass, coach, gyms) => {
        return(
            <CoachClassContainer addClass={addClass} coach={coach} gyms={gyms}/>
        )
    }

    renderCoachCalendar = () => {
        return(
            <CoachCalendar allClasses={this.props.allClasses} coach={this.props.coach} coach_classes={this.props.coach_classes}/>
        )
    }

    renderGyms = () => {
        return(
            <GymContainer addGym={this.props.addGym}/>
        )
    }

    renderSidenavOptions = (addClass, coach, gyms) => {
        return (
            <div className="sidenav-options">
               {this.renderMap()}
               {this.renderCoachClassContainer(addClass, coach, gyms)}
               {this.renderGyms()}
               {this.renderCoachCalendar()}
            </div>
        )
    }

    render(){
        return(
            <div className="sidenav-container">
                {this.renderSidenavOptions(this.props.addClass, this.props.coach, this.props.gyms)}
            </div>
        )}
    }

export default withRouter(CoachNavContainer)