import React from 'react' 
import Reminder from './Reminder'
import AddReminderForm from './AddReminderForm'

class RemindersContainer extends React.Component {
    
    state = {
        reminder: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        fetch('http://localhost:3000/reminders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.reminder
            })
        })
        .then(response => response.json())
        .then(console.log)
    }
    
    render(){
        let arrayOfReminderComponents = this.props.remindersArray.map((reminderObj) => {
            return <Reminder key={reminderObj.id} reminder={reminderObj}/>
        })
        console.log(this.state.reminder)
        return(
            <div>
                <h1>Reminders</h1>
                <AddReminderForm 
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
                reminderField={this.state.reminder}
                />
                { arrayOfReminderComponents }
            </div>
        )
    }
}

export default RemindersContainer