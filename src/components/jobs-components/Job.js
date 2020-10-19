import React from 'react'
import NotesContainer from './NotesContainer'

class Job extends React.Component {
    
    render() {

        let { id, company_name, url, status, notes } = this.props.job

        return(
            <div>
                <h1>{company_name}</h1>
                <h2>{url}</h2>
                <select>
                    <option value="not applied">not applied</option>
                    <option value="applied">applied</option>
                    <option value="interviewed">interviewed</option>
                    <option value="offered">offered</option>
                    <option value="hired">hired</option>
                </select>
                <NotesContainer notesArray={notes} />
            </div>
            
        )
    }

}

export default Job