import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import CoachNavContainer from './CoachNavContainer'
class CoachMainContent extends React.Component {

    renderCoachInfo = () => {
        return (
            <div className="coach-info">
                <h3>Coach name: {this.props.coach.name}</h3>
            </div>
        )
    }

    renderLogout = () => {
        return (
            <Button onClick={() => {
                localStorage.clear()
                this.props.history.push('/')
                }}>Log Out
            </Button>
        )
    }
    render(){
        let {addClass, updateClass, gyms, allClasses, coach, addGym, coach_classes} = this.props
        return(
            <div className="main-page">
                {this.renderCoachInfo()}
                {this.renderLogout()}
                <CoachNavContainer addClass={addClass} updateClass={updateClass}  gyms={gyms} allClasses={allClasses} coach={coach} addGym={addGym} coach_classes={coach_classes}/>
            </div>
        )
    }
}

export default withRouter(CoachMainContent)