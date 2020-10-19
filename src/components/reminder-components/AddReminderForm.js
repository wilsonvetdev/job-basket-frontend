import React from 'react'

class AddReminderForm extends React.Component {

    render() {
        return(
            <form onSubmit={this.props.handleSubmit}>
                <input 
                    type='text' 
                    name='reminder'
                    value={this.props.reminder}
                    onChange={this.props.handleChange}
                    placeholder='add reminder here'
                />
            </form>
        )
    }

}

export default AddReminderForm