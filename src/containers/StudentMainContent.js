import React from 'react';
import {  withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import StudentNavContainer from './StudentNavContainer'
import { MapContainer } from './MapContainer';
import 'react-infinite-calendar/styles.css' // only needs to be imported once

class StudentMainContent extends React.Component {
    renderMap = () => {
        return(
            <div id="overall-map">
                <MapContainer/>
            </div>
        )
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
        let receiver = []
        for(let x = 0; x < this.props.friend_requests_as_receiver.length; x++){
            receiver.push(this.props.friend_requests_as_receiver[x].requestor_name)
        }
        for(let x = 0; x < this.props.friend_requests_as_requestor.length; x++){
            receiver.push(this.props.friend_requests_as_requestor[x].receiver_name)
        }
        let arr = [...receiver, this.props.student.name]
        let names = this.props.student_names.filter(name => !arr.includes(name.name))

        return names.map(name => {
            return(
                <div>
                    {name.name}
                    <button onClick={(e) => this.props.postFriendRequests(e, this.props.student, name)}>add friend</button>
                </div>
            ) 
        })
    }

    renderFriendRequests = () => {
        let friends = []
        let pending = []

        for(let x = 0; x < this.props.friend_requests_as_receiver.length; x++){
            if(this.props.friend_requests_as_receiver[x].status === 'accepted'){
                friends.push(this.props.friend_requests_as_receiver[x].requestor_name)
            }   
            else{
                pending.push(this.props.friend_requests_as_receiver[x].requestor_name)
            }
        }

        for(let x = 0; x < this.props.friend_requests_as_requestor.length; x++){
            if(this.props.friend_requests_as_requestor[x].status === 'accepted'){
                friends.push(this.props.friend_requests_as_requestor[x].receiver_name)
            }
            else{
                pending.push(this.props.friend_requests_as_requestor[x].receiver_name)
            }
        }
        console.log(friends, pending)
        return this.props.friend_requests_as_receiver.map(name => {
            if(name.status === 'pending'){
                return(
                    <div>
                        {name.requestor_name}
                        <button onClick={(e) => this.props.handleAccept(e, name.id)}>Accept</button>
                    </div>
                )
            }
        })
    }

    renderFriends = () => {
        let friends = []

        for(let x = 0; x < this.props.friend_requests_as_receiver.length; x++){
            if(this.props.friend_requests_as_receiver[x].status === 'accepted'){
                friends.push(this.props.friend_requests_as_receiver[x].requestor_name)
            }   
        }

        for(let x = 0; x < this.props.friend_requests_as_requestor.length; x++){
            if(this.props.friend_requests_as_requestor[x].status === 'accepted'){
                friends.push(this.props.friend_requests_as_requestor[x].receiver_name)
            }
        }
        return friends.map(name => {
            return(
                <div>
                    {name}
                </div>
            )
        })
    }

    render(){
        let {addDate, updateDate, deleteDate, student, classes, addNewClass} = this.props
        return(
            <div className="main-page">
                <ul>
                    <li><a class="active" href="#home">Home</a></li>
                    <li><a href="#news">Calendar</a></li>
                    <li><a href="#contact">Test</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                {this.renderUserInfo()}
                {this.renderLogout()} 
                Friend suggestions:
                {this.renderNames()}
                Waiting:
                {this.renderFriendRequests()}
                Friends:
                {this.renderFriends()}
                {this.renderMap()}
                <StudentNavContainer dates={this.props.student_dates} addDate={addDate} updateDate={updateDate} 
                    student={student} classes={classes} addNewClass={addNewClass} deleteDate={deleteDate}
                />
            </div>
        )
    }
}

export default withRouter(StudentMainContent)