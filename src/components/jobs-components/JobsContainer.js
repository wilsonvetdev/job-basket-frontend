import React from 'react'
import Job from './Job'

const JobsContainer = props => {

    let arrayOfJobsComponent = props.jobsArray.map((jobObj) => {
        return <Job key={jobObj.id} job={jobObj} />
    })

    return(
        <div>
            { arrayOfJobsComponent } 
        </div>
    )
}

export default JobsContainer