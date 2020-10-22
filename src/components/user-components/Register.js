import React from 'react'
import { Button, Form, Container, Segment } from 'semantic-ui-react'

const Register = () => (
    <Container>
        <Segment inverted>
            <Form inverted size='large'>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First Name' placeholder='Enter First Name' />
                    <Form.Input fluid label='Last Name' placeholder='Enter Last Name' />
                </Form.Group>
                    <Form.Input fluid label='Email' placeholder='Enter Email' />
                    <Form.Input fluid label='Password' type='password' placeholder='Enter Password' />
                    <Form.Checkbox label='Keep me signed in' />
                <Button type='submit'>Submit</Button>
            </Form>
        </Segment>
    </Container>
)


export default Register