import React from 'react'

import { Button, Form, Container, Segment, Input } from 'semantic-ui-react'

class SignIn extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleSignInSubmit(this.state)
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
                        <Form.Input 
                        fluid
                        id='form-input-control-email'
                        control={Input}
                        label='Email' 
                        placeholder='Enter email' 
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                        <Form.Input 
                        fluid 
                        id='form-input-control-password'
                        label='Password' 
                        name='password'
                        type='password' 
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                        <Form.Checkbox label='Keep me signed in'
                        />
                        <Button
                        id='form-button-control-public'
                        type='submit'
                        >
                        Submit
                        </Button>
                    </Form>
                </Segment>
            </Container>

        )
    }
}


export default SignIn