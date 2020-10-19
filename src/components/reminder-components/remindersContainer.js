import React from 'react' 
import Reminder from './Reminder'
import AddReminderForm from './AddReminderForm'

class RemindersContainer extends React.Component {
    
    
    render(){
        let arrayOfReminderComponents = this.props.remindersArray.map((reminderObj) => {
            return <Reminder key={reminderObj.id} reminder={reminderObj}/>
        })
        return(
            <div>
                <h1>Reminders</h1>
                <AddReminderForm />
                { arrayOfReminderComponents }
            </div>
        )
    }
}

export default RemindersContainer