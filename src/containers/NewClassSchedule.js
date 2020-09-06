import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class NewClassSchedule extends Component {
    state = {
        id: null, 
        student_name: null,
        class_session_id: null,
        scheduleAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(e.target.name)
    }

    handleSubmit = (e, addNewClass) => {
        e.preventDefault()
        let {student_name, class_session_id} = this.state
        if(student_name !== null && class_session_id !== null){
            let class_info = {
                student_name: student_name,
                class_session_id: parseInt(class_session_id),
                student_id: parseInt(this.props.student.id)
            }
            // persist to database
            if(this.state.scheduleAdd){
                addNewClass(class_info)
            } 
            // reset state
            this.setState({
                id: null,
                student_name: null,
                class_session_id: null,
                scheduleAdd: true
            })
            e.target.parentElement.children[0].reset()
        }
        else{
            alert("You must include your student_name and class to sign up for a class.")
        }
    }

    autoFillForm = (selectedValue, classes) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                student_name: null,
                class_session_id: null,
                scheduleAdd: true
            })
        }
        else{
            let class_info = classes.find(class_info => class_info.id == selectedValue)
            this.setState({
                id: class_info.id,
                student_name: class_info.student_name,
                class_session_id: class_info.class_session_id,
                scheduleAdd: false
            })
        }
    }

    handleClassDropdownChange = (e) => {
        if(e.target.value !== "n/a"){
            this.setState({class_session_id: parseInt(e.target.value)})
        }
    }

    generateClassDropdownOptions = (classes) => {
        return classes.map(class_info => {
            return <option id={class_info.id} key={class_info.id} value={class_info.id}>
                    {class_info.attributes.name}, {class_info.attributes.date},  
                    {class_info.attributes.time}, {class_info.attributes.duration},  
                    {class_info.attributes.coach.student_name}
                </option>
            }
        )
    }

    render(){
        let {addNewClass, student, classes} = this.props
        return(
            <div>
                new class schedule
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addNewClass)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="student_name" id="student_name" placeholder="Student name" value={this.props.student.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup onChange={this.handleClassDropdownChange}>
                            <Input type="select" name="select" id="edit-goal">
                                <option value={"n/a"}>Select class</option>
                                {classes ? this.generateClassDropdownOptions(classes) : false}
                            </Input>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form> 
                </CardBody>
            </div>
        )
    }
}