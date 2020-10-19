import React from 'react';
import './App.css';
import JobsContainer from './components/jobs-components/JobsContainer'
import RemindersContainer from './components/reminder-components/RemindersContainer'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from 'semantic-ui-react'

class App extends React.Component {

  state = {
    id: 0,
    full_name: '',
    email: '',
    jobs: [],
    reminders: []
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
      return { reminders: copyOfReminders}
    })
  }

  render() {
    return (
      <div className="App">
        <Segment placeholder inverted color='#1F1E1C'>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <h1> Add Job Form Here </h1>
              </Grid.Column>

              <Grid.Column>
              <RemindersContainer 
                remindersArray={this.state.reminders} 
                updateRemindersFromState={this.updateRemindersFromState}
              />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Segment>
        <JobsContainer jobsArray={this.state.jobs} />
      </div>
    )
  }
}

export default App;
