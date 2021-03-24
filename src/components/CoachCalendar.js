import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

export default class CoachCalendar extends Component {
    dates = () => {
        return this.props.coach_classes.map(element => {
            return {
                title: element.name,
                date: element.date
            }
        });
    }

    renderEventDetails = () => {
        return this.props.allClasses.data.map(element => {
            if(element.attributes.coach.name === this.props.coach.name){
                return (
                    <div>
                        {element.attributes.name}
                        {element.attributes.class_lists.map(info => {
                            return(
                                <div>
                                    {info.student_name}
                                </div>
                            )  
                        })}
                    </div>
                )
            }
        });
    }

    render(){
        if (!this.props.allClasses.data) {
            return <span>Loading...</span>;
        }
        return(
            <div>
                {this.renderEventDetails()}
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    defaultView="dayGridMonth"
                    events={this.dates()}
                />
            </div>
        )
    }
}