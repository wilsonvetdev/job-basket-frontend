import React from 'react';
import './App.css';
import JobsContainer from './components/jobs-components/JobsContainer'
import RemindersContainer from './components/reminder-components/RemindersContainer'
import AddJobForm from './components/jobs-components/AddJobForm'
import {
  Container,
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'

class App extends React.Component {

  state = {
    id: 0,
    full_name: '',
    email: '',
    jobs: [],
    reminders: [],
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
      <div className="App">
      <Container>
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
          <Divider horizontal inverted>Saved Jobs</Divider>
          <JobsContainer 
            jobsArray={this.state.jobs} 
            handleDeleteJob={this.handleDeleteJob}
            addNoteToJob={this.addNoteToJob}
            deleteNoteFromJob={this.deleteNoteFromJob}
            updateNote={this.updateNote}
          />
        </Container>
      </div>
    )
  }
}

export default App;
