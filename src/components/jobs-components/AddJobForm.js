import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

class AddJobForm extends React.Component {

    state = {
        companyName: '',
        url: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch('https://job-basket-api.herokuapp.com/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                company_name: this.state.companyName,
                url: this.state.url,
                status: 'not applied',
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
                <Form size={'large'} inverted onSubmit={this.handleSubmit}>
                        <Form.Input 
                        fluid 
                        icon='building' iconPosition='left'
                        type='text'
                        label='Company Name' 
                        placeholder='Company Name'
                        name='companyName'
                        value={this.state.companyName}
                        onChange={this.handleChange}
                        />
                        <Form.Input 
                        fluid 
                        icon='address book' iconPosition='left'
                        type='text'
                        label='Company URL' 
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