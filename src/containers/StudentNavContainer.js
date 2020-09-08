import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { MapContainer } from './MapContainer';
import MyCalendar from '../components/StudentCalendar'
import NewClassSchedule from './NewClassSchedule'

class StudentNavContainer extends React.Component {
    // state = {
    //     modalShow: false
    // }

    // showModal = () => {
    //     this.setState({
    //         modalShow: !this.state.modalShow
    //     })
    // }

    renderMap = () => {
        return(
            <div>
                map
                <MapContainer/>
            </div>
        )
    }

    renderNewSchedule = (addNewClass, student) => {
        return(
            <NewClassSchedule classes={this.props.classes} addNewClass={addNewClass} student={student}/>
        )
    }

    renderCalendar = (addDate, updateDate, deleteDate, student) => {
        return(
            <MyCalendar student_dates={this.props.dates} classes={this.props.classes} 
                addDate={addDate} updateDate={updateDate} deleteDate={deleteDate} student={student} show={this.props.show}
            />
        )
    }

    renderSidenavOptions = (addDate, updateDate, deleteDate, addNewClass, student) => {
        return (
            <div className="sidenav-options">
                <ul>
                    <li><a class="active" href="#home">Home</a></li>
                    {/* <li><a href="#news" onClick={this.showModal}>Calendar</a></li> */}
                    <li><a href="#contact">Test</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                {this.renderMap()}
                {this.renderNewSchedule(addNewClass, student)}
                {this.renderCalendar(addDate, updateDate, deleteDate, student)}
            </div>
        )
    }

    render(){
        let {addDate, updateDate, deleteDate, addNewClass, student} = this.props
        return(
            <div className="sidenav-container">
                {this.renderSidenavOptions(addDate, updateDate, deleteDate, addNewClass, student)}
            </div>
        )}
    }

export default withRouter(StudentNavContainer)