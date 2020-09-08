import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import StudentNavContainer from './StudentNavContainer'
import MyCalendar from '../components/StudentCalendar'
import 'react-infinite-calendar/styles.css' // only needs to be imported once

class StudentMainContent extends React.Component {
    state = {
        modalShow: false
    }

    showModal = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    renderUserInfo = () => {
        return (
            <div className="student-info">
                <h3>Student name: {this.props.student.name}</h3>
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

    renderNames = () => {
        return this.props.student_names.map(name => {
            if(name.name !== this.props.student.name){
                return(
                    <div>
                        {name.name}
                        <button onClick={(e) => this.props.postFriendRequests(e, this.props.student, name.id)}>add friend</button>
                    </div>
                )
            }
        })
    }

    render(){
        let {addDate, updateDate, deleteDate, student, classes, addNewClass} = this.props
        return(
            <div>
                <ul>
                    <li><a class="active" href="#home">Home</a></li>
                    <li><a href="#news" onClick={this.showModal}>Calendar</a></li>
                    <li><a href="#contact">Test</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                {this.renderUserInfo()}
                {this.renderLogout()} 
                {this.renderNames()}
                <StudentNavContainer dates={this.props.student_dates} addDate={addDate} updateDate={updateDate} 
                    student={student} classes={classes} addNewClass={addNewClass} deleteDate={deleteDate} show={this.state.modalShow}
                />
            </div>
            
        )
    }
}

export default withRouter(StudentMainContent)