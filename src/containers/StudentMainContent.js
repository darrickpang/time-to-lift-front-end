import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

class StudentMainContent extends React.Component {
    renderUserInfo = () => {
        return (
            <div className="student-info">
                <h3>Name: {this.props.student.name}</h3>
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
        console.log(this.props.student)
        return(
            <div>
                Student is logged in
                {this.renderUserInfo()}
                {this.renderLogout()}
            </div>
        )
    }
}

export default withRouter(StudentMainContent)