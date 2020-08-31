import React from 'react';
import {  withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import StudentNavContainer from './StudentNavContainer'
import 'react-infinite-calendar/styles.css' // only needs to be imported once
import MyCalendar from '../components/Calendar'

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
        return(
            <div>
                Student is logged in
                {this.renderUserInfo()}
                {this.renderLogout()} 
                <StudentNavContainer />
                <MyCalendar/>
            </div>
            
        )
    }
}

export default withRouter(StudentMainContent)