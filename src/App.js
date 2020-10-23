import React from 'react';
import './App.css';
import SignIn from './components/user-components/SignIn'
import Register from './components/user-components/Register'
import Home from './components/user-components/Home'
import { Container,Button } from 'semantic-ui-react'
import { Route, Switch, withRouter, Link, Redirect } from 'react-router-dom'

class App extends React.Component {

  state = {
    id: 0,
    full_name: '',
    email: '',
    jobs: [],
    reminders: [],
    jobStatus: 'all jobs'
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/users/2')
  //     .then(response => response.json())
  //     .then(response => {
  //       let { id, full_name, email, jobs, reminders } = response
  //       this.setState({
  //         id,
  //         full_name,
  //         email, 
  //         jobs, 
  //         reminders
  //       })
  //     })
  // }

  helpHandleResponse = (resp) => {
    if(resp.error){
      console.error(resp.error)
    } else {
      localStorage.token = resp.token
      this.setState({
        id: resp.user.id,
        email: resp.user.email,
        full_name: resp.user.full_name,
        jobs: resp.user.jobs,
        reminders: resp.user.reminders,
        token: resp.token
      })
      return <Redirect to='/home' />
    }
  }

  handleSignInSubmit = (userInfo) => {
    fetch('http://localhost:3000/users/signin', {
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
    .then(returnedObj => console.log(returnedObj))
      
  }
  

  renderSignInForm = () => {
    return <SignIn handleSignInSubmit={this.handleSignInSubmit} />
  }

  changeJobStatus = (chosenStatus) => {
    this.setState((prevState) => {
      return { jobStatus: chosenStatus }
    }, () => console.log("inside setSTATE", this.state.jobStatus))
    console.log("OUTSIDE", this.state.jobStatus) 
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
    fetch(`http://localhost:3000/jobs/${job.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
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
    fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: 'DELETE'
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

  updateJobFromState = (jobObj) => {
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

  renderHome = (routerProps) => {
    if(this.state.id) {
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
      />
    } else {
      return <Redirect to='/signin' />
    }
  }


  render() {
    return (
      <Container fluid className='App'>

          <Container className='button-group'>
            <Button as={ Link } to='home' content='Home' />
            <Button>Settings</Button>
            <Button as={ Link } to='/signin' content='Sign In' />
            <Button as={ Link} to='/register' content='Register' />    
          </Container>

          <Switch>
            <Route path='/home' render={this.renderHome} /> 
            <Route path='/signin' render={this.renderSignInForm} /> 
            <Route path='/register' render={() => <Register /> } /> 
          </Switch>

      </Container>
    )
  }
}


export default withRouter(App)
