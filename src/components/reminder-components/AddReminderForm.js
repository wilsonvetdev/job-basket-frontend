import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

class AddReminderForm extends React.Component {

    render() {
        return(
            <Segment inverted>
                <form onSubmit={this.props.handleSubmit}>
                    <Form.Input
                        label='Add reminder'
                        type='text' 
                        name='reminder'
                        value={this.props.reminderField}
                        onChange={this.props.handleChange}
                        placeholder='add reminder here'
                    />
                </form>
            </Segment>
        )
    }

}

export default AddReminderForm