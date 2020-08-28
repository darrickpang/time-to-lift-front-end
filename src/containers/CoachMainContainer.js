import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

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
        return(
            <div>
                Coach is logged in
                {this.renderCoachInfo()}
                {this.renderLogout()}
            </div>
        )
    }
}

export default withRouter(CoachMainContent)