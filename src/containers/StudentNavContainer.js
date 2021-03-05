import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { MapContainer } from './MapContainer';
import MyCalendar from '../components/StudentCalendar'
import NewClassSchedule from './NewClassSchedule'

class StudentNavContainer extends React.Component {
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
            <div>
                <NewClassSchedule classes={this.props.classes} addNewClass={addNewClass} student={student}/>
            </div>
            
        )
    }

    renderCalendar = (addDate, updateDate, deleteDate, student) => {
        return(
            <MyCalendar student_dates={this.props.dates} classes={this.props.classes} 
                addDate={addDate} updateDate={updateDate} deleteDate={deleteDate} student={student}
                student_classes={this.props.student_classes}
            />
        )
    }

    renderSidenavOptions = (addDate, updateDate, deleteDate, addNewClass, student) => {
        return (
            <div>
                {/* {this.renderMap()} */}
                {this.renderNewSchedule(addNewClass, student)}
                {this.renderCalendar(addDate, updateDate, deleteDate, student)}
            </div>
        )
    }

    render(){
        let {addDate, updateDate, deleteDate, addNewClass, student} = this.props
        return(
            <div id="calendar">
                {this.renderSidenavOptions(addDate, updateDate, deleteDate, addNewClass, student)}
            </div>
        )
    }
}

export default withRouter(StudentNavContainer)