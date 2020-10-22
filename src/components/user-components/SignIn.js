import React from 'react'

import { Button, Form, Container, Segment } from 'semantic-ui-react'

const SignIn = () => (
    <Container>
        <Segment inverted>
            <Form inverted size='large'>
                <Form.Input fluid label='Email' placeholder='Enter email' />
                <Form.Input fluid label='Password' type='password' placeholder='Password' />
                <Form.Checkbox label='Keep me signed in' />
                <Button type='submit'>Submit</Button>
            </Form>
        </Segment>
    </Container>
)


export default SignIn