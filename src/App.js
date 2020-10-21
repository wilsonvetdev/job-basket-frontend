import React from 'react';
import './App.css';
import JobsContainer from './components/jobs-components/JobsContainer'
import RemindersContainer from './components/reminder-components/RemindersContainer'
import AddJobForm from './components/jobs-components/AddJobForm'
import Sort from './components/jobs-components/Sort'
import AppHeader from './components/Header'
import {
  Container,
  Divider,
  Grid,
  Segment,
} from 'semantic-ui-react'

class App extends React.Component {

  state = {
    id: 0,
    full_name: '',
    email: '',
    jobs: [],
    reminders: [],
    jobStatus: 'all jobs'
  }

  componentDidMount() {
    fetch('http://localhost:3000/users/2')
      .then(response => response.json())
      .then(response => {
        let { id, full_name, email, jobs, reminders } = response
        this.setState({
          id,
          full_name,
          email, 
          jobs, 
          reminders
        })
      })
  }

  changeJobStatus = (chosenStatus) => {
    this.setState((prevState) => {
      return { jobStatus: chosenStatus }
    })
    // console.log(this.state.jobStatus) 
    // office hours questions:
    // how come this code is one step behind when I console.log onto browser
    // pagination resources and pointers
    // app breaks when I go into iphone X size
    // how to hide original notes when editing
  }

  helperFunctionThatReturnsAnArray = () => {
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
      let copyOfJobs = [...prevState.jobs, newJobObj]
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
    let filteredNotes = foundJob.notes.filter((note) => {
      return note.id !== updatedNoteObj.id
    })

    let copyOfJob = {
      ...foundJob, 
      notes: [updatedNoteObj, ...filteredNotes]
    }

    console.log(copyOfJob)
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

  render() {
    return (
      <Container fluid textAlign='center' className='App'>
        <AppHeader jobs={this.state.jobs} />

          <Segment placeholder inverted>
            <Grid columns={2} stackable textAlign='center'>
              <Divider vertical inverted>OR</Divider>

              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                  <AddJobForm 
                    addJobToState={this.addJobToState}
                  />
                </Grid.Column>

                <Grid.Column>
                  <RemindersContainer 
                    remindersArray={this.state.reminders} 
                    updateRemindersFromState={this.updateRemindersFromState}
                    deleteReminderFromState={this.deleteReminderFromState}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Divider horizontal inverted>Sort Saved Jobs</Divider>
          <Sort changeJobStatus={this.changeJobStatus} jobStatus={this.state.jobStatus}/>
          <Divider horizontal inverted>Saved Jobs</Divider>

          <JobsContainer 
            jobsArray={this.helperFunctionThatReturnsAnArray()} 
            handleDeleteJob={this.handleDeleteJob}
            addNoteToJob={this.addNoteToJob}
            deleteNoteFromJob={this.deleteNoteFromJob}
            updateNote={this.updateNote}
            handleUpdateJob={this.handleUpdateJob}
          />
      </Container>
    )
  }
}

export default App;
