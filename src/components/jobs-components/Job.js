import React from 'react'
import NotesContainer from './NotesContainer'
import { Card, Button, Select, Form } from 'semantic-ui-react'


class Job extends React.Component {

    state = {
        addBtnClicked: false,
        noteField: ''
    }

    handleClick = () => {
        this.setState({addBtnClicked: !this.state.addBtnClicked})
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleStatusChange = event => {
        this.props.handleUpdateJob(this.props.job, event.target.innerText)
    }

    handleAddNote = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                content: this.state.noteField,
                job_id: this.props.job.id
            })
        })
        .then(response => response.json())
        .then((newNoteObj) => {
            this.props.addNoteToJob(newNoteObj, this.props.job.id)
            this.setState({ noteField: '' })
        })
    }

    handleDeleteNote = (noteId) => {
        fetch(`http://localhost:3000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': this.props.token
            },
        })
        .then(response => response.json())
        .then((returnedObj) => {
            this.props.deleteNoteFromJob(returnedObj, this.props.job)
        })
    }
    
    render() {
        
        let { id, company_name, url, status, notes } = this.props.job

        const statusOptions = [
            { key: 'n', text: 'not applied', value: 'not applied'},
            { key: 'a', text: 'applied', value: 'applied'},
            { key: 'i', text: 'interviewed', value: 'interviewed'},
            { key: 'o', text: 'offered', value: 'offered'},
            { key: 'h', text: 'hired', value: 'hired'}
        ]

        return(

            <Card>
                <Card.Content>
                    <Card.Header>{company_name}</Card.Header>
                    <Card.Meta>{url}</Card.Meta>
                    <Card.Description>
                        <NotesContainer 
                            notesArray={notes} 
                            handleDeleteNote={this.handleDeleteNote}
                            updateNote={this.props.updateNote}
                            token={this.props.token}
                        />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui'>
                    <Button basic color='green' 
                    onClick={this.handleClick}>
                        {this.state.addBtnClicked ? 'Finish' : 'Add Note'}
                    </Button>
                    <Button basic color='red' onClick={() => this.props.handleDelete(id)}>
                        Delete Job
                    </Button>
                    </div>
                </Card.Content>
                    <Form inverted onSubmit={this.handleAddNote}>
                        <Form.Input
                            style={this.state.addBtnClicked ? {display: ''} : {display: 'none'}}
                            fluid
                            icon='pencil' iconPosition='left'
                            type='text' 
                            name='noteField'
                            value={this.state.noteField}
                            onChange={this.handleChange}
                            placeholder='add notes here'
                        />
                    </Form>
                    <Select
                        onChange={this.handleStatusChange}
                        options={statusOptions}
                        placeholder={status}
                    />
            </Card>
            
        )
    }

}

export default Job