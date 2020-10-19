import { render } from '@testing-library/react'
import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

class AddJobForm extends React.Component {

    state = {
        companyName: '',
        url: ''
    }

    handleSubmit = (event) => {
        console.log('hello here')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.companyName, this.state.url)
    }

    render() {
        return(
            <Segment inverted>
                <Form inverted onSubmit={this.handleSubmit}>
                        <Form.Input 
                        fluid 
                        type='text'
                        label='Company Name' 
                        placeholder='Company Name'
                        name='companyName'
                        value={this.state.companyName}
                        onChange={this.handleChange}
                        />
                        <Form.Input 
                        fluid 
                        type='text'
                        label='Compnay URL' 
                        placeholder='Company URL' 
                        name='url'
                        value={this.state.url}
                        onChange={this.handleChange}
                        />
                <Button type='submit'>Add Job</Button>
                </Form>
            </Segment>
        )
    }
}

export default AddJobForm