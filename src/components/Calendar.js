import React, { Component } from 'react'
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";

export default class MyCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: "2020-08-01",
            days: 31,
            scale: "Day",
            eventHeight:30,
            cellWidth: 50,
            timeHeaders: [

                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}

            ],
            cellWidthSpec: "Auto",
            resources: [
                {name: "Resource A", id: "A"},
    
            ],
            events: [
                {id: 1, text: "Event 1", start: "2020-8-02T00:00:00", end: "2020-8-05T00:00:00", resource: "A" }
            ]
        };
    }

    render() {
        return(
            <DayPilotScheduler
                startDate = {DayPilot.Date.today().firstDayOfMonth()}
                days = {DayPilot.Date.today().daysInMonth()}
                scale = {"Day"}
                timeHeaders = {[
                    { groupBy: "Month"},
                    { groupBy: "Day", format: "d"}
                ]}
                resources = {[
                    {name: "Resource A", id: "A"},
                ]}
                onTimeRangeSelected={args => {
                    DayPilot.Modal.prompt("New event name", "Event").then(modal => {
                        this.scheduler.clearSelection();
                        if (!modal.result) {
                            return;
                        }
                        this.scheduler.events.add({
                            id: DayPilot.guid(),
                            text: modal.result,
                            start: args.start,
                            end: args.end,
                            resource: args.resource
                        });
                    });
                }}
                ref={component => { this.scheduler = component && component.control; }}
            />
        )
    }
}