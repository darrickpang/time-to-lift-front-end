import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'
// import interactionPlugin from "@fullcalendar/interaction";
export default class MyCalendar extends Component {

    dates = () => {
        return this.props.student_dates.map(element => {
            return {
                title: element.class_name,
                date: element.date
            }
        });
    }

    state = {
        id: null, 
        class_name: null,
        date: null,
        dateAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addDate, updateDate, deleteDate) => {
        e.preventDefault()
        let {class_name, date} = this.state
        if(class_name !== null && date !== null){
            let date_info = {
                class_name: class_name,
                date: date,
                student_id: parseInt(this.props.student.id)
            }
            // persist to database
            if(this.state.dateAdd){
                addDate(date_info)
            } 
            else if(!this.state.dateAdd && e.target[4].innerText === "Update schedule"){
                updateDate(this.state.id, date_info)
            }
            else {
                deleteDate(this.state.id, date_info)
            }
            // reset state
            this.setState({
                id: null,
                class_name: null,
                date: null,
                dateAdd: true
            })
            e.target.parentElement.children[0].reset()
        }
        else{
            alert("You must include a class name and date to create a new schedule.")
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                class_name: null,
                date: null,
                dateAdd: true
            })
        }
        else{
            let date_info = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: date_info.id,
                class_name: date_info.class_name,
                date: date_info.date,
                dateAdd: false
            })
        }
    }

    generateDateDropdownOptions = (student_dates) => {
        return student_dates.map(date => {
            return <option id={date.id} key={date.id} value={date.id}>
                    {date.date}, {date.class_name}
                </option>
            }
        )
    }

    render() {
        let {addDate, updateDate, deleteDate, classes, student_dates} = this.props
        // console.log(classes[0])
        if (!classes) {
            return <span>Loading...</span>;
        }
        // console.log(this.props)
        return (
            <div>
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addDate, updateDate, deleteDate)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="class_name" id="class_name" placeholder="Class name" value={this.state.class_name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="date" id="date" placeholder="Class date" value={this.state.date} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, student_dates)}>
                            <Label for="edit-schedule">Change schedule</Label>
                            <Input type="select" name="select" id="edit-schedule">
                                <option value={"n/a"}>n/a</option>
                                {student_dates ? this.generateDateDropdownOptions(student_dates) : false}
                            </Input>
                        </FormGroup>
                        <Button>Add schedule</Button>
                        <Button onSubmit={(e) => this.handleSubmit(e, updateDate)}>Update schedule</Button>
                        <Button onSubmit={(e) => this.handleSubmit(e, deleteDate)}>Delete schedule</Button>
                    </Form> 
                </CardBody>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    defaultView="dayGridMonth"
                    events={this.dates()}
                />
            </div>
        )
    }
}