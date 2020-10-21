import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

class AddReminderForm extends React.Component {

    render() {
        return(
            <Segment inverted>
                <Form inverted onSubmit={this.props.handleSubmit}>
                    <Form.Input
                        label='Reminders'
                        icon='pencil' iconPosition='left'
                        fluid
                        type='text' 
                        name='reminder'
                        value={this.props.reminderField}
                        onChange={this.props.handleChange}
                        placeholder='add reminder here'
                    />
                </Form>
            </Segment>
        )
    }

}

export default AddReminderForm