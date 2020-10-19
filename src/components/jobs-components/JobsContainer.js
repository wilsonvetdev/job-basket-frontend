import React from 'react'
import Job from './Job'
import { Card } from 'semantic-ui-react'

const JobsContainer = props => {

    let arrayOfJobsComponent = props.jobsArray.map((jobObj) => {
        return <Job key={jobObj.id} job={jobObj} />
    })

    return(
        <Card.Group>
            { arrayOfJobsComponent } 
        </Card.Group>
    )
}

export default JobsContainer