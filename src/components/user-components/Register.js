import React from 'react'
import { Button, Form, Container, Segment } from 'semantic-ui-react'

class Register extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleRegisterSubmit(this.state)
    }

    handleChange = (event) => {
        let { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <Container>
                <Segment inverted>
                    <Form inverted size='large' onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid name='firstName' label='First Name' placeholder='Enter First Name' onChange={this.handleChange} />
                            <Form.Input fluid name='lastName' label='Last Name' placeholder='Enter Last Name' onChange={this.handleChange} />
                        </Form.Group>
                            <Form.Input fluid name='email' label='Email' placeholder='Enter Email' onChange={this.handleChange} />
                            <Form.Input fluid name='password' label='Password' type='password' placeholder='Enter Password' onChange={this.handleChange} />
                            <Form.Checkbox label='Keep me signed in' />
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </Container>
        
        )
    }

}

export default Register