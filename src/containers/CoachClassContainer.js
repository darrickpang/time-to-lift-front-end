import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class CoachClassContainer extends Component {
    state = {
        id: null, 
        name: '',
        date: '',
        time: '',
        duration: '',
        gym_id: null,
        classAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addClass, updateClass) => {
        e.preventDefault()
        let {name, duration, date, time, gym_id} = this.state
        if(name !== null && time !== null && date !== null && duration !== null && gym_id !== null){
            let class_info = {
                name: name,
                time: time,
                date: date,
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
                name: null,
                time: null,
                date: null,
                duration: null,
                gym_id: null,
                classAdd: true
            })
            e.target.parentElement.children[0].reset()
        }
        else{
            alert("You must include name, duration, time, date, and gym to create a new class.")
        }
    }

    autoFillForm = (selectedValue, classes) => {
        if(selectedValue === "n/a"){
            this.setState({
                id: null,
                name: null,
                time: null,
                date: null, 
                duration: null,
                gym_id: null,
                classAdd: true
            })
        }
        else{
            let class_info = classes.find(class_info => class_info.id == selectedValue)
            this.setState({
                id: class_info.id,
                name: class_info.name,
                date: class_info.date,
                time: class_info.time, 
                duration: class_info.duration,
                gym_id: class_info.gym_id,
                classAdd: false
            })
        }
    }

    handleGymDropdownChange = (e) => {
        if(e.target.value !== "n/a"){
            this.setState({gym_id: parseInt(e.target.value)})
        }
    }

    generateClassDropdownOptions = (classes) => {
        return classes.map(class_info => {
            return <option id={class_info.id} key={class_info.id} value={class_info.id}>{class_info.name}</option>
        })
    }

    generateGymDropdownOptions = (gyms) => {
        return gyms.map(gym => {
            if(gym.id === this.state.gym_id){
                return <option id={gym.id} key={gym.id} value={gym.id} selected>{gym.name}, {gym.address}</option>
            }
            else{
                return <option id={gym.id} key={gym.id} value={gym.id}>{gym.name}, {gym.address}</option>
            }
        })
    }

    render(){
        let {addClass, updateClass, gyms} = this.props
        return(
            <div>
                Classes
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addClass, updateClass, gyms)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Class name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="time" id="time" placeholder="Class time" value={this.state.time} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="date" id="date" placeholder="Class date" value={this.state.date} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="duration" id="duration" placeholder="Class duration" value={this.state.duration} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    
                        <FormGroup onChange={this.handleGymDropdownChange}>
                            <Input type="select" name="select" id="edit-goal">
                                <option value={"n/a"}>Select gym</option>
                                {gyms ? this.generateGymDropdownOptions(gyms) : false}
                            </Input>
                        </FormGroup>
                        <Button className="button">Submit</Button>
                    </Form> 
                </CardBody>
            </div>
        )
    }
}