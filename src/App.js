import React from 'react';
import './App.css';
import SignIn from './components/user-components/SignIn'
import Register from './components/user-components/Register'
import Home from './components/user-components/Home'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import { Container,Button } from 'semantic-ui-react'
import { Route, Switch, withRouter, Link, Redirect } from 'react-router-dom'

class App extends React.Component {

  state = {
    id: 0,
    full_name: '',
    email: '',
    jobs: [],
    reminders: [],
    jobStatus: 'all jobs',
    token: ''
  }

  componentDidMount() {
    if(localStorage.token){
      fetch('https://job-basket-api.herokuapp.com/users/keep_logged_in', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then(response => response.json())
      .then(this.helpHandleResponse)
    }
  }

  helpHandleResponse = (response) => {
    if(response.error){
      console.error(response.error)
    } else {
      localStorage.token = response.token
      this.setState(() => {
        return {
        id: response.user.id,
        email: response.user.email,
        full_name: response.user.full_name,
        jobs: response.user.jobs,
        reminders: response.user.reminders,
        token: response.token
        }
      })
      this.props.history.push('/home')
    }
  }

  handleSignInSubmit = (userInfo) => {
    fetch('https://job-basket-api.herokuapp.com/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password
      })
    })
    .then(response => response.json())
    .then(this.helpHandleResponse)
  }

  handleSignOut = () => {
    this.setState({
      id: 0,
      full_name: '',
      email: '',
      jobs: [],
      reminders: [],
      jobStatus: 'all jobs',
      token: ""
    })
    localStorage.clear()
  }

  handleRegisterSubmit = (userInfo) => {
    fetch('https://job-basket-api.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: userInfo.firstName, 
        last_name: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password
      })
    })
    .then(response => response.json())
    .then(this.helpHandleResponse)
  }


  renderSignInForm = () => {
      return <SignIn handleSignInSubmit={this.handleSignInSubmit} />
  }

  renderRegisterForm = () => {
    return <Register handleRegisterSubmit={this.handleRegisterSubmit} />
  }

  changeJobStatus = (chosenStatus) => {
    this.setState(() => {
      return { jobStatus: chosenStatus }
    })
  }

  filteredJobArray = () => {
    if(this.state.jobStatus === 'all jobs') {
      return this.state.jobs
    }
    else if(this.state.jobStatus === 'not applied'){
      return this.state.jobs.filter(job => job.status === 'not applied')
    }
    else if(this.state.jobStatus === 'applied'){
      return this.state.jobs.filter(job => job.status === 'applied')
    }
    else if(this.state.jobStatus === 'interviewed'){
      return this.state.jobs.filter(job => job.status === 'interviewed')
    }
    else if(this.state.jobStatus === 'offered'){
      return this.state.jobs.filter(job => job.status === 'offered')
    }
    else if(this.state.jobStatus === 'hired'){
      return this.state.jobs.filter(job => job.status === 'hired')
    } else {
      return this.state.jobs
    }
  }

  handleUpdateJob = (job, newStatus) => {
    fetch(`https://job-basket-api.herokuapp.com/jobs/${job.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
      body: JSON.stringify({
        status: newStatus
      })
    })
    .then(response => response.json())
    .then(this.updateJobFromState)
  }

  updateRemindersFromState = (newReminderObj) => {
    this.setState((prevState) => {
      let copyOfReminders = [...prevState.reminders, newReminderObj]
      return { reminders: copyOfReminders }
    })
  }

  deleteReminderFromState = (reminderObjId) => {
    this.setState(prevState => {
      let filteredReminders = prevState.reminders.filter((reminder) => {
        return reminder.id !== reminderObjId
      })
      return { reminders: filteredReminders }
    })
  }

  addJobToState = (newJobObj) => {
    this.setState((prevState) => {
      let copyOfJobs = [newJobObj, ...prevState.jobs]
      return { jobs: copyOfJobs }
    })
  }

  handleDeleteJob = (jobId) => {
    fetch(`https://job-basket-api.herokuapp.com/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': this.state.token
      },
    })
    .then(response => response.json())
    .then(this.deleteJobFromState(jobId))
}

  deleteJobFromState = (jobObjId) => {
    this.setState(prevState => {
      let filteredJobs = prevState.jobs.filter((job) => {
        return job.id !== jobObjId
      })
      return { jobs: filteredJobs }
    })
  }

  updateJobFromState = (jobObj, event) => {
    let copyOfJobs = this.state.jobs.map((job) => {
      if(job.id === jobObj.id){
        return jobObj
      } else {
        return job
      }
    })
    this.setState({ jobs: copyOfJobs })
  }

  addNoteToJob = (newNoteObj, jobId) => {
    let foundJob = this.state.jobs.find(job => job.id === jobId)
    let copyOfNotes = [...foundJob.notes, newNoteObj]
    let copyOfJob = {
      ...foundJob, 
      notes: copyOfNotes
    }
    this.updateJobFromState(copyOfJob)
  }

  updateNote = (updatedNoteObj, jobId) => {
    let foundJob = this.state.jobs.find(job => job.id === jobId)
    let foundNoteIndex = foundJob.notes.findIndex((note) => note.id === updatedNoteObj.id)
    let copyOfJob = { ...foundJob }
    copyOfJob.notes[foundNoteIndex] = updatedNoteObj
    this.updateJobFromState(copyOfJob)
  }

  deleteNoteFromJob = (noteObj, jobObj) => {
    let foundJob = this.state.jobs.find(job => job.id === jobObj.id)
    let filteredNotes = foundJob.notes.filter((note) => {
      return note.id !== noteObj.id
    })
    let copyOfJob = {
      ...foundJob,
      notes: filteredNotes
    }
    this.updateJobFromState(copyOfJob)
  }

  renderHome = () => {
    if(this.state.token) {
      return <Home 
              jobs={this.state.jobs}
              addJobToState={this.addJobToState} 
              reminders={this.state.reminders} 
              updateRemindersFromState={this.updateRemindersFromState}
              deleteReminderFromState={this.deleteReminderFromState}
              changeJobStatus={this.changeJobStatus}
              jobStatus={this.state.jobStatus}
              filteredJobArray={this.filteredJobArray}
              handleDeleteJob={this.handleDeleteJob}
              addNoteToJob={this.addNoteToJob}
              deleteNoteFromJob={this.deleteNoteFromJob}
              updateNote={this.updateNote}
              handleUpdateJob={this.handleUpdateJob}
              token={this.state.token}
      />
    } else {
      return <Redirect to='/signin' />
    }
  }


  render() {
    return (
      <Container fluid className='App'>

          <Container className='button-group'>
            <Button as={ Link } to='/home' content='Home' />
            <Button>Settings</Button>
            <Button as={ Link } 
            to='/signin' 
            content='Sign In' 
            style={this.state.token ? {display: 'none'} : {display: ''}}
            />
            <Button as={ Link } 
            to='/signin' 
            content='Sign Out' 
            onClick={this.handleSignOut} 
            style={this.state.token ? {display: ''} : {display: 'none'}}
            />
            <Button 
            as={ Link} 
            to='/register' 
            content='Register' 
            style={this.state.token ? {display: 'none'} : {display: ''}}
            /> 
            </Container>
          {this.state.token ? null : <Welcome /> }

          <Switch>
            <Route path='/home' render={this.renderHome} /> 
            <Route path='/signin' render={this.renderSignInForm} /> 
            <Route path='/register' render={this.renderRegisterForm} /> 
          </Switch>

          <Footer />

      </Container>
    )
  }
}


export default withRouter(App)
