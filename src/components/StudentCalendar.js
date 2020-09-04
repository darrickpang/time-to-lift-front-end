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

    handleSubmit = (e, addDate, updateDate) => {
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
            else if(!this.state.dateAdd && e.target.name === "submit"){
                updateDate(this.state.id, date_info)
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

    generateClassDropdownOptions = (classes) => {
        return classes.map(class_info => {
            return <option id={class_info.id} key={class_info.id} value={class_info.id}>
                    {class_info.attributes.name}, {class_info.attributes.date},  
                    {class_info.attributes.time}, {class_info.attributes.duration},  
                    {class_info.attributes.coach.name}
                </option>
            }
        )
    }

    render() {
        let {addDate, updateDate, classes} = this.props
        // console.log(classes[0])
        if (!classes) {
            return <span>Loading...</span>;
        }
        console.log(classes[0].attributes)
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
                                    <Input type="text" name="date" id="date" placeholder="Class date" value={this.state.date} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            
                        </Row>
                        <Button>Submit</Button>
                    </Form> 
                </CardBody>
                <FormGroup onChange={this.handleClassDropdownChange}>
                            <Input type="select" name="select" id="edit-goal">
                                <option value={"n/a"}>Select class</option>
                                {classes ? this.generateClassDropdownOptions(classes) : false}
                            </Input>
                    </FormGroup>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    defaultView="dayGridMonth"
                    events={this.dates()}
                />
            </div>
        )
    }
}