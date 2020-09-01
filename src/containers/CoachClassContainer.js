import React, { Component } from 'react';
import {CardBody, Button, Form, Input, FormGroup, Row, Col, Label} from 'reactstrap'

export default class CoachClassContainer extends Component {
    state = {
        id: null, 
        name: '',
        location: '',
        duration: "min",
        coach_id: null,
        gym_id: null
    }
    
}