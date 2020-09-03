import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import MapContainer from './MapContainer'
import CoachClassContainer from './CoachClassContainer'
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

    renderCoachClassContainer = (classes, gym, addClass, updateClass, coach, allClasses) => {
        return(
            <CoachClassContainer classes={classes} gym={gym} addClass={addClass} updateClass={updateClass} coach={coach} allClasses={allClasses}/>
        )
    }

    renderSidenavOptions = (classes, gym, addClass, updateClass, coach, allClasses) => {
        return (
            <div className="sidenav-options">
               {this.renderMap()}
               {this.renderCoachClassContainer(classes, gym, addClass, updateClass, coach, allClasses)}
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

export default withRouter(CoachNavContainer)