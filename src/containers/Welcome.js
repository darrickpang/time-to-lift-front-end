import React from "react";
import { Button, Container } from "reactstrap";
import { useHistory } from 'react-router-dom'

const Welcome = () => {
  let history = useHistory()

    return (
      <div style={{backgroundImage: "url(" + require("../image/KHHK-BaseCamp4.jpg") + ")",}} className="page-header">
        <Container className='welcome-page'>
            <h1>Come With Me If You Want to Lift!</h1>
            <h3>Find a gym and class and schedule an appointment.</h3>
            <br />
            <Button className="login-button" onClick={() => history.push('/coach_signup')}> Coach Sign Up</Button>
            <Button className="login-button" onClick={() => history.push('/coach_login')}>Coach Login</Button>
            <Button className="login-button" onClick={() => history.push('/student_signup')}> Student Sign Up</Button>
            <Button className="login-button" onClick={() => history.push('/student_login')}>Student Login</Button>
        </Container>
      </div>
  );
}

export default Welcome