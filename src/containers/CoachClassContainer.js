import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class CoachClassContainer extends Component {
    state = {
        id: null, 
        name: '',
        location: '',
        duration: '',
        coach_id: null,
        gym_id: null,
        classAdd: true
    }
    
    handleOnChange = (e) => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addClass, updateClass) => {
        e.preventDefault()
        let class_info = {
            name: this.state.name,
            location: this.state.location,
            duration: this.state.duration,
            coach_id: this.state.coach_id,
            gym_id: this.state.gym_id
        }
        this.state.classAdd ? addClass(class_info) : updateClass(this.state.id, class_info)
        this.setState({
            id: null,
            name: '',
            location: '',
            duration: '',
            coach_id: null,
            gym_id: null,
            classAdd: true
        })
        e.target.reset()
    }

    handleSubmit = (e, addClass, updateClass) => {
        e.preventDefault()
        let {name, duration, location, gym_id, coach_id} = this.state
        if(name !== null && location !== null && duration !== null && gym_id !== null && coach_id !== null){
            let class_info = {
                name: name,
                location: location,
                duration: duration,
                gym_id: parseInt(gym_id),
                coach_id: parseInt(this.props.coach.id)
            }
            // persist to database
            if(this.state.classAdd){
                addClass(class_info)
            } 
            else if(!this.state.classAdd && e.target.name === "submit"){
                updateClass(this.state.id, class_info)
            }
            // reset state
            this.setState({
                id: null,
                name: '',
                location: '',
                duration: '',
                coach_id: null,
                gym_id: null,
                classAdd: true
            })
            e.target.parentElement.reset()
        }
        else{
            alert("You must include name, duration, and location to create a new class.")
        }
    }

    autoFillForm = (selectedValue, classes) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                name: '',
                location: '',
                duration: '',
                coach_id: null,
                gym_id: null,
                classAdd: true
            })
        }
        else{
            let class_info = classes.find(class_info => class_info.id == selectedValue)
            this.setState({
                id: class_info.id,
                name: class_info.name,
                location: class_info.location,
                duration: class_info.duration,
                coach_id: class_info.coach_id,
                gym_id: class_info.gym_id,
                classAdd: false
            })
        }
    }

    generateClassDropdownOptions = (classes) => {
        return classes.map(class_info => {
            return <option id={class_info.id} key={class_info.id} value={class_info.id}>{class_info.activity}</option>
        })
    }

    render(){
        let {classes, addClass, updateClass} = this.props
        // console.log(this.props)
        return(
            <div>
                Coach class container
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addClass, updateClass)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Class name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="location" id="location" placeholder="Class location" value={this.state.location} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="duration" id="duration" placeholder="Class duration" value={this.state.duration} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    
                        <FormGroup onChange={(e) => this.autoFillForm(e.target.value, classes)}>
                            <Label for="edit-habit">(optional) edit a class</Label>
                                <Input type="select" name="selectMulti" id="edit-habit">
                                    <option value={"n/a"}>n/a</option>
                                    {classes ? this.generateClassesDropdownOptions(classes) : false}
                                </Input>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form> 
                </CardBody>
            </div>
        )
    }
}