import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Map from '../components/Map';
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

    renderSidenavOptions = () => {
        return (
            <div className="sidenav-options">
               {this.renderMap()}
               {this.renderCalendar()}
            </div>
        )
    }

    render(){
        console.log(this.props.student)
        return(
            <div className="sidenav-container">
                {this.renderSidenavOptions()}
            </div>
        )}
    }

export default withRouter(StudentNavContainer)