import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
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
        class_name: '',
        date: '',
        // student_id: this.props.student.id,
        dateAdd: true
    }
    
    handleOnChange = (e) => {
        console.log(e.target.class_name)
        this.setState({
            [e.target.class_name]: e.target.value
        })
    }

    handleSubmit = (e, addDate, updateDate) => {
        e.preventDefault()
        let dates_info = {
            class_name: this.state.class_name,
            date: this.state.date
        }
        this.state.dateAdd ? addDate(dates_info) : updateDate(this.state.id, dates_info)
        this.setState({
            id: null,
            class_name: '',
            date: '',
            dateAdd: true
        })
        e.target.reset()
    }

    handleSubmit = (e, addDate, updateDate) => {
        e.preventDefault()
        let {class_name, date} = this.state
        if(class_name !== null && date !== null){
            let dates_info = {
                class_name: class_name,
                date: date
            }
            // persist to database
            if(this.state.dateAdd){
                addDate(dates_info)
            } 
            else if(!this.state.dateAdd && e.target.class_name === "submit"){
                updateDate(this.state.id, dates_info)
            }
            // reset state
            this.setState({
                id: null,
                class_name: '',
                date: '',
                dateAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include class_name and date to create a new schedule.")
        }
    }

    autoFillForm = (selectedValue, dates) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                class_name: '',
                date: '',
                dateAdd: true
            })
        }
        else{
            let dates_info = dates.find(dates_info => dates_info.id == selectedValue)
            this.setState({
                id: dates_info.id,
                class_name: dates_info.class_name,
                date: dates_info.date,
                dateAdd: false
            })
        }
    }

    generateClassDropdownOptions = (dates) => {
        return dates.map(dates_info => {
            return <option id={dates_info.id} key={dates_info.id} value={dates_info.id}>{dates_info.activity}</option>
        })
    }

    render() {
        let {addDate, updateDate} = this.props
        return (
            <div>
                
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addDate, updateDate)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="class_name" id="class_name" placeholder="Class name" value={this.state.class_name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="date" id="date" placeholder="date" value={this.state.date} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            
                        </Row>
                        <Button>Submit</Button>
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