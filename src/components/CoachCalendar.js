import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class CoachCalendar extends Component {
    dates = () => {
        return this.props.allClasses.map(element => {
            return {
                title: element.name,
                date: element.date
            }
        });
    }

    render(){
        return(
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                defaultView="dayGridMonth"
                events={this.dates()}
            />
        )
    }
}