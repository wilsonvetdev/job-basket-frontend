import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

class AddJobForm extends React.Component {

    state = {
        companyName: '',
        url: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                company_name: this.state.companyName,
                url: this.state.url,
                status: 'not applied',
                user_id: 2
            })
        })
        .then(response => response.json())
        .then((newJobObj) => {
            this.props.addJobToState(newJobObj)
            this.setState({
                companyName: '',
                url: ''
            })
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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