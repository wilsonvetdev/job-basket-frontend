import React from 'react'

class AddReminderForm extends React.Component {

    state = {
        reminder: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <form>
                <input 
                    type='text' 
                    name='reminder'
                    value={this.state.reminder}
                    onChange={this.handleChange}
                    placeholder='add reminder here'
                />
            </form>
        )
    }

}

export default AddReminderForm