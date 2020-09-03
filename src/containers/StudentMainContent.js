import React from 'react';
import {  withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import StudentNavContainer from './StudentNavContainer'
import 'react-infinite-calendar/styles.css' // only needs to be imported once

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
        let {addDate, updateDate, student} = this.props
        return(
            <div>
                Student is logged in
                {this.renderUserInfo()}
                {this.renderLogout()} 
                <StudentNavContainer dates={this.props.student_dates} addDate={addDate} updateDate={updateDate} student={student}/>
            </div>
            
        )
    }
}

export default withRouter(StudentMainContent)