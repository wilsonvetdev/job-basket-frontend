import React from 'react'
import JobsContainer from '../jobs-components/JobsContainer'
import RemindersContainer from '../reminder-components/remindersContainer'
import AddJobForm from '../jobs-components/AddJobForm'
import Sort from '../jobs-components/Sort'
import AppHeader from '../Header'
import {
    Divider,
    Grid,
    Segment,
} from 'semantic-ui-react'

class Home extends React.Component {

    render() {
        
        let {
            jobs, 
            addJobToState, 
            reminders, 
            updateRemindersFromState,
            deleteReminderFromState,
            changeJobStatus,
            jobStatus,
            filteredJobArray,
            handleDeleteJob,
            addNoteToJob,
            deleteNoteFromJob,
            updateNote,
            handleUpdateJob,
            token
        } = this.props

        return(
            <div>
            <AppHeader jobs={jobs} />
                <Segment placeholder inverted>
                    <Grid columns={2} stackable textAlign='center'>
                    <Divider vertical inverted>OR</Divider>

                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                        <AddJobForm 
                            addJobToState={addJobToState}
                            token={token}
                        />
                        </Grid.Column>

                        <Grid.Column>
                        <RemindersContainer 
                            remindersArray={reminders} 
                            updateRemindersFromState={updateRemindersFromState}
                            deleteReminderFromState={deleteReminderFromState}
                            token={token}
                        />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>

                <Divider horizontal inverted>Sort Saved Jobs</Divider>
                <Sort changeJobStatus={changeJobStatus} jobStatus={jobStatus} />
                <Divider horizontal inverted>Saved Jobs</Divider>

                <JobsContainer 
                    jobsArray={filteredJobArray()} 
                    handleDeleteJob={handleDeleteJob}
                    addNoteToJob={addNoteToJob}
                    deleteNoteFromJob={deleteNoteFromJob}
                    updateNote={updateNote}
                    handleUpdateJob={handleUpdateJob}
                    token={token}
                />
            </div>
        )
    }
}

export default Home