import React from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'

const SignIn = () => (
    <Segment inverted>
        <Form inverted>
        <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' />
            <Form.Input fluid label='Last name' placeholder='Last name' />
        </Form.Group>
        <Form.Checkbox label='Keep me signed in' />
        <Button type='submit'>Sign In</Button>
        </Form>
    </Segment>
)


export default SignIn