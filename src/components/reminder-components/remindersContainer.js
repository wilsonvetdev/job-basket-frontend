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
                content: this.state.reminder,
                user_id: 2
            })
        })
        .then(response => response.json())
        .then((newReminderObj) => {
            this.props.updateRemindersFromState(newReminderObj)
            this.setState({reminder: ''})
        })
    }
    
    render(){

        let arrayOfReminderComponents = this.props.remindersArray.map((reminderObj) => {
            return <Reminder key={reminderObj.id} reminder={reminderObj}/>
        })

        return(
            <div>
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