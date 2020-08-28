import React from 'react';
import './App.css';
import Welcome from './containers/Welcome';
import StudentLoginSignUp from './components/StudentLoginSignUp';
import StudentMainContent from './containers/StudentMainContent';
import CoachLoginSignUp from './components/CoachLoginSignUp';
import CoachMainContent from './containers/CoachMainContainer';
import { Switch, Route, withRouter} from 'react-router-dom';

class App extends React.Component {

  state = {
    student: {
      id: null,
      name: "",
      age: "",
      location: ""
    },
    coach: {
      id: null,
      name: "",
      age: "",
      location: ""
    },
    token: ""
  }

  // componentDidMount(){
  //   if(localStorage.token){
  //     fetch('http://localhost:3000/student_persist',{
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.token}`
  //     }
  //     })
  //     .then(res => res.json())
  //     .then(json => this.studentAuthResponse(json))
  //   }
  // }

  // Student login and sign-up
  studentAuthResponse = (json) => {
    if (json.student){
      localStorage.token = json.token
      this.setState({
        student: {
          id: json.student.data.attributes.id,
          name: json.student.data.attributes.name,
          age: json.student.data.attributes.age,
          location: json.student.data.attributes.location
        },
        token: json.token
      }, () => this.props.history.push('/student_main'))
    }
  }

  studentLogin = ({name, password}) => {
    let student = {
      name: name,
      password: password
    }

    fetch('http://localhost:3000/student_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.studentAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  studentSignUp = ({name, password, age, location}) => {
    let newStudent = {
      name: name,
      password: password,
      age: age,
      location: location
    }
    
    fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.studentAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  renderStudentLogin = () => {
    return <StudentLoginSignUp login={true} studentLogin={this.studentLogin}/>
  }

  renderStudentSignUp = () => {
    return <StudentLoginSignUp login={false} studentSignUp={this.studentSignUp}/>
  }

  renderStudentMainContent = () => {
    return <StudentMainContent student ={this.state.student} token={this.state.token} />
  }

  // Coach sign-in and sign-up
  componentDidMount(){
    if(localStorage.token){
      fetch('http://localhost:3000/coach_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.coachAuthResponse(json))
    }
  }

  coachAuthResponse = (json) => {
    if (json.coach){
      localStorage.token = json.token
      this.setState({
        coach: {
          id: json.coach.data.attributes.id,
          name: json.coach.data.attributes.name,
          age: json.coach.data.attributes.age,
          location: json.coach.data.attributes.location
        },
        token: json.token
      }, () => this.props.history.push('/coach_main'))
    }
  }

  coachLogin = ({name, password}) => {
    let coach = {
      name: name,
      password: password
    }

    fetch('http://localhost:3000/coach_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coach)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.coachAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  coachSignUp = ({name, password, age, location}) => {
    let newCoach = {
      name: name,
      password: password,
      age: age,
      location: location
    }
    
    fetch('http://localhost:3000/coaches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCoach)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.coachAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  renderCoachLogin = () => {
    return <CoachLoginSignUp login={true} coachLogin={this.coachLogin}/>
  }

  renderCoachSignUp = () => {
    return <CoachLoginSignUp login={false} coachSignUp={this.coachSignUp}/>
  }

  renderCoachMainContent = () => {
    return <CoachMainContent coach ={this.state.coach} token={this.state.token} />
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/coach_login" render={this.renderCoachLogin}/>
          <Route path="/coach_signup" render={this.renderCoachSignUp}/>
          <Route path="/coach_main" render={this.renderCoachMainContent}/>
          <Route path="/student_login" render={this.renderStudentLogin}/>
          <Route path="/student_signup" render={this.renderStudentSignUp}/>
          <Route path="/student_main" render={this.renderStudentMainContent}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);