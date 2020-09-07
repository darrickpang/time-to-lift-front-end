import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import CoachNavContainer from './CoachNavContainer'
class CoachMainContent extends React.Component {

    renderCoachInfo = () => {
        return (
            <div className="coach-info">
                <h3>Name: {this.props.coach.name}</h3>
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
        let {addClass, updateClass, gyms, allClasses, coach, addGym} = this.props
        // console.log(addClass)
        return(
            <div>
                Coach is logged in
                {this.renderCoachInfo()}
                {this.renderLogout()}
                <CoachNavContainer addClass={addClass} updateClass={updateClass}  gyms={gyms} allClasses={allClasses} coach={coach} addGym={addGym}/>
            </div>
        )
    }
}

export default withRouter(CoachMainContent)