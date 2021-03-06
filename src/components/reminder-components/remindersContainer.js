import React from 'react' 
import Reminder from './Reminder'
import AddReminderForm from './AddReminderForm'
import { Item } from 'semantic-ui-react'

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
        fetch('https://job-basket-api.herokuapp.com/reminders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                content: this.state.reminder,
            })
        })
        .then(response => response.json())
        .then((newReminderObj) => {
            this.props.updateRemindersFromState(newReminderObj)
            this.setState({ reminder: '' })
        })
    }

    handleDelete = (reminderId) => {
        fetch(`https://job-basket-api.herokuapp.com/reminders/${reminderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.props.token
            }
        })
        .then(response => response.json())
        .then(this.props.deleteReminderFromState(reminderId))
    }
    
    render(){

        let arrayOfReminderComponents = this.props.remindersArray.map((reminderObj) => {
            return <Reminder 
                    key={reminderObj.id} 
                    reminder={reminderObj}
                    handleDelete={this.handleDelete}
                    />
        })

        return(
            <div>
                <AddReminderForm 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                    reminderField={this.state.reminder}
                />
                <Item.Group>
                    { arrayOfReminderComponents }
                </Item.Group>
            </div>
        )
    }
}

export default RemindersContainer