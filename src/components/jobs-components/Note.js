import React from 'react'
import { Item, Button, Form } from 'semantic-ui-react'

class Note extends React.Component {

    state = {
        value: this.props.note.content,
        edit: false
    }

    handleDelete = () => {
        this.props.handleDeleteNote(this.props.note.id)
    }

    toggleEdit = (event) => {
        this.setState({ edit: !this.state.edit })
        if(this.state.edit) {
            this.handleEditNote(event)
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEditNote = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/notes/${this.props.note.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                content: this.state.value,
                job_id: this.props.note.job_id
            })
        })
        .then(response => response.json())
        .then((updatedObj) => {
            this.props.updateNote(updatedObj, this.props.note.job_id)
        })
    }

    render() {
        return(
            <Item>
                <Button compact={true} icon={true} onClick={this.handleDelete}>
                x
                </Button>
                <Button compact={true} icon={true} onClick={this.toggleEdit}>
                {this.state.edit ? 'save' : 'edit'}
                </Button>
                <Item.Content>
                {!this.state.edit ? 
                    this.props.note.content
                    :
                    <Form onSubmit={this.toggleEdit}>
                        <Form.Input
                            fluid
                            icon='pencil' iconPosition='left'
                            type='text' 
                            name='value'
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                        </Form.Input>
                    </Form>
                }
                </Item.Content>
            </Item>
        )

    }
    
}

export default Note