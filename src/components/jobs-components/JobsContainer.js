import React from 'react'
import Job from './Job'
import { Card } from 'semantic-ui-react'


const JobsContainer = props => {

    let arrayOfJobsComponent = props.jobsArray.map((jobObj) => {
        return <Job 
                key={jobObj.id} 
                job={jobObj} 
                handleDelete={props.handleDeleteJob}
                addNoteToJob={props.addNoteToJob}
                deleteNoteFromJob={props.deleteNoteFromJob}
                updateNote={props.updateNote}
                handleUpdateJob={props.handleUpdateJob}
                token={props.token}
                />
    })

    return(
        <Card.Group centered itemsPerRow={3}>
            { arrayOfJobsComponent } 
        </Card.Group>
    )
}

export default JobsContainer