import React from 'react'
import NotesContainer from './NotesContainer'
import { Card, Button, Select } from 'semantic-ui-react'

class Job extends React.Component {
    
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
                        <NotesContainer notesArray={notes} />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui'>
                    <Button basic color='green'>
                        Approve
                    </Button>
                    <Select
                        options={statusOptions}
                        placeholder='Status'
                    />
                    </div>
                </Card.Content>
            </Card>
            
        )
    }

}

export default Job