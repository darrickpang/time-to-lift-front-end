import React from 'react';
import { withRouter } from 'react-router-dom';
import { MapContainer } from './MapContainer';
import MyCalendar from '../components/StudentCalendar'

class StudentNavContainer extends React.Component {
    state = {
        modalShow: false
    }

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    renderMap = () => {
        return(
            <div>
                map
                <MapContainer />
            </div>
        )
    }

    renderCalendar = (addDate, updateDate, student) => {
        return(
            <MyCalendar student_dates={this.props.dates} addDate={addDate} updateDate={updateDate} student={student}/>
        )
    }

    renderSidenavOptions = (addDate, updateDate, student) => {
        return (
            <div className="sidenav-options">
               {this.renderMap()}
               {this.renderCalendar(addDate, updateDate, student)}
            </div>
        )
    }

    render(){
        return(
            <div className="sidenav-container">
                {this.renderSidenavOptions(this.props.addDate, this.props.updateDate, this.props.student)}
            </div>
        )}
    }

export default withRouter(StudentNavContainer)