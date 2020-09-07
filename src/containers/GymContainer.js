import React, { Component } from 'react'
import {CardBody, Button, Form, Input, FormGroup, Row, Col} from 'reactstrap'

export default class GymContainer extends Component {
    state = {
        id: null, 
        name: null,
        address: null,
        city: null,
        zip_code: null,
        gymAdd: true
    }
    
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, addGym) => {
        e.preventDefault()
        let {name, address, city, zip_code} = this.state
        if(name !== null && address !== null){
            let gym_info = {
                name: name,
                address: address,
                city: city,
                zip_code: zip_code
            }
            // persist to database
            if(this.state.gymAdd){
                addGym(gym_info)
            } 
            // reset state
            this.setState({
                id: null,
                name: null,
                address: null,
                city: null,
                zip_code: null,
                gymAdd: true
            })
            e.target.parentElement.children[0].reset()
        }
        else{
            alert("You must include the name and address to create a new gym.")
        }
    }

    render() {
        let {addGym} = this.props
        // console.log(classes[0])
     
        // console.log(this.props)
        return (
            <div>
                <CardBody>
                    <Form onSubmit={(e) => this.handleSubmit(e, addGym)}>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="name" id="name" placeholder="Gym name" value={this.state.name} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="address" id="address" placeholder="Gym address" value={this.state.address} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="city" id="city" placeholder="Gym city" value={this.state.city} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input type="text" name="zip_code" id="zip_code" placeholder="Gym zip code" value={this.state.zip_code} onChange={this.handleOnChange}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button>Add gym</Button>
                    </Form> 
                </CardBody>
            </div>
        )
    }
}