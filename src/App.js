import React from 'react';
import './App.css';
import JobsContainer from './components/jobs-components/JobsContainer'
import RemindersContainer from './components/reminder-components/RemindersContainer'

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
        <RemindersContainer 
          remindersArray={this.state.reminders} 
          updateRemindersFromState={this.updateRemindersFromState}
        />
        <br></br>
        <JobsContainer jobsArray={this.state.jobs} />
      </div>
    )
  }
}

export default App;
