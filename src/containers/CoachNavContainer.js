import React from 'react';
import { withRouter } from 'react-router-dom';
import MapContainer from './MapContainer'
import CoachClassContainer from './CoachClassContainer'
import CoachCalendar from '../components/CoachCalendar'
import GymContainer from './GymContainer'
import 'react-infinite-calendar/styles.css' 

class CoachNavContainer extends React.Component {
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

    renderCoachClassContainer = (addClass, coach, gyms) => {
        return(
            <CoachClassContainer addClass={addClass} coach={coach} gyms={gyms}/>
        )
    }

    renderCoachCalendar = () => {
        return(
            <CoachCalendar allClasses={this.props.allClasses}/>
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
        // console.log(this.props.addClass)
        return(
            <div className="sidenav-container">
                {this.renderSidenavOptions(this.props.addClass, this.props.coach, this.props.gyms)}
            </div>
        )}
    }

export default withRouter(CoachNavContainer)