import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

const AddJobForm = (props) => {

    return(
        <Segment inverted>
            <Form inverted>
                    <Form.Input fluid label='Company Name' placeholder='Company Name' />
                    <Form.Input fluid label='Compnay URL' placeholder='Company URL' />
            <Button type='submit'>Add Job</Button>
            </Form>
        </Segment>
    )

}

export default AddJobForm