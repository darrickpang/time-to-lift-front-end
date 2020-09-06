import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
export default class CoachCalendar extends Component {
    dates = () => {
        return this.props.allClasses.data.map(element => {
            return {
                title: element.attributes.name,
                date: element.attributes.date
            }
        });
    }

    renderEventDetails = () => {
        return this.props.allClasses.data.map(element => {
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
        });
    }

    render(){
        if (!this.props.allClasses.data) {
            return <span>Loading...</span>;
        }
        console.log(this.props.allClasses.data[0].attributes.class_lists)
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