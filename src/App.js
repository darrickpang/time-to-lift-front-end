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
    student_dates: [],
    class_lists: [],
    classes: [],
    gyms: [],
    token: "",
    coach_token: ""
  }

  componentDidMount(){
    //student_token
    if(localStorage.token){  
      fetch('http://localhost:3000/student_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.studentAuthResponse(json))
    }
    
    // coach token
    else if(localStorage.coach_token){ 
      fetch('http://localhost:3000/coach_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.coach_token}`
      }
      })
      .then(res => res.json())
      .then(json => this.coachAuthResponse(json))
    }
    // grab all gyms
    fetch(`http://localhost:3000/gyms`)
    .then(r => r.json())
    .then(json => this.setState({gyms: json}))

    // all classes
    fetch('http://localhost:3000/class_sessions')
    .then(res => res.json())
    .then(json => this.setState({classes: json}))
  }

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
        student_dates: json.student.data.attributes.student_dates,
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
    return <StudentMainContent student ={this.state.student} token={this.state.token} 
            student_dates={this.state.student_dates} addDate={this.addDate} classes={this.state.classes.data}
            updateDate={this.updateDate} addNewClass={this.addNewClass}
          />
  }

  // Coach sign in or sign up
  coachAuthResponse = (json) => {
    if (json.coach){
      localStorage.coach_token = json.coach_token
      this.setState({
        coach: {
          id: json.coach.data.attributes.id,
          name: json.coach.data.attributes.name,
          age: json.coach.data.attributes.age,
          location: json.coach.data.attributes.location
        },
        coach_token: json.coach_token,
        classes: json.coach.data.attributes.class_sessions
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
    return <CoachMainContent coach ={this.state.coach} allClasses={this.state.classes} 
    coach_token={this.state.coach_token} addClass={this.addClass} updateClass={this.updateClass} addGym={this.addGym} gyms={this.state.gyms}/>
  }

  // Classes information 
  addClass= (newClass) => {
    fetch(`http://localhost:3000/class_sessions`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newClass),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        classes: [...this.state.classes, {
          id: json.id,
          name: json.name,
          time: json.time,
          date: json.date,
          duration: json.duration,
          gym_id: json.gym_id
        }]
      })
    })
  }

  updateClass = (id, class_info) => {
    fetch(`http://localhost:3000/class_sessions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(class_info)
    })
    .then(res => res.json())
    .then(json => {
      let classes = this.state.classes.map(class_info => {
        if(class_info.id === json.id){
            let newClass = {
                  id: json.id,
                  name: json.name,
                  time: json.time,
                  date: json.date,
                  duration: json.duration,
                  gym_id: json.gym_id
            }
            return newClass
            }
            else{
              return class_info
            }
        })
        this.setState({
            classes: classes
    })})
  }

  // student class dates
  addDate = (newDate) => {
    fetch(`http://localhost:3000/student_dates`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newDate),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        student_dates: [...this.state.student_dates, {
          id: json.id,
          class_name: json.class_name,
          date: json.date
        }]
      })
    })
  }

  updateDate = (id, date_info) => {
    fetch(`http://localhost:3000/student_dates/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(date_info)
    })
    .then(res => res.json())
    .then(json => {
      let student_dates = this.state.dates.map(date_info => {
        if(date_info.id === json.id){
            let newDate = {
                  id: json.id,
                  class_name: json.class_name,
                  date: json.date,
            }
            return newDate
            }
            else{
              return date_info
            }
        })
        this.setState({
            student_dates: student_dates
    })})
  }

  // add new class 
  addNewClass= (newClass) => {
    fetch(`http://localhost:3000/class_lists`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
      body: JSON.stringify(newClass),
  }) 
  .then(r => r.json())
  .then(json => {
      this.setState({
        class_lists: [...this.state.class_lists, {
          id: json.id,
          student_name: json.student_name,
          class_session_id: json.class_session_id
        }]
      })
    })
  }

  // gyms
  addGym = (newGym) => {
    fetch(`http://localhost:3000/gyms`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newGym),
    }) 
    .then(r => r.json())
    .then(json => {
        this.setState({
          gyms: [...this.state.gyms, {
            id: json.id,
            name: json.name,
            address: json.address,
            city: json.city,
            zip_code: json.zip_code
      }]})
    })
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