import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class MyCalendar extends Component {
    dates = () => {
        let classNames = []
        this.props.student_classes.map(element => {
            classNames.push({name: element.name, date: element.date})
        })
        this.props.student_dates.map(element => {
            classNames.push({name: element.class_name, date: element.date})
        })
        console.log(classNames)
        return classNames.map(element => {
            return {
                title: element.name,
                date: element.date
            }
        });
    }

    state = {
        id: null, 
        class_name: null,
        date: null,
        dateAdd: true,
        deleteDate: false
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.name)
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
            else if(!this.state.dateAdd && e.target.name === "update"){
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
                dateAdd: true,
                deleteDate: false
            })
            e.target.parentElement.reset()
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
                dateAdd: true,
                deleteDate: false
            })
        }
        else{
            let find_date = dates.find(date_info => date_info.id == selectedValue)
            this.setState({
                id: find_date.id,
                class_name: find_date.class_name,
                date: find_date.date,
                dateAdd: false,
                deleteDate: true
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
        let {addDate, updateDate, deleteDate, classes, student_dates, show} = this.props
        if (!classes) {
            return <span>Loading...</span>;
        }
        console.log(this.props.student_classes)
        return (
            <div>
                Make a new schedule 
                <CardBody>
                    <Form>
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
                                <option value={"n/a"}>Select schedule</option>
                                {student_dates ? this.generateDateDropdownOptions(student_dates) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button" name="update" onClick={(e) => this.handleSubmit(e, addDate, updateDate, deleteDate)}>Add or update schedule</Button>
                        {this.state.deleteDate ? 
                            <Button className="button"onClick={(e) => this.handleSubmit(e, addDate, updateDate, deleteDate)}>Delete Schedule</Button> : false
                        }
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