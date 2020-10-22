import React from 'react'
import JobsContainer from '../jobs-components/JobsContainer'
import RemindersContainer from '../reminder-components/RemindersContainer'
import AddJobForm from '../jobs-components/AddJobForm'
import Sort from '../jobs-components/Sort'
import AppHeader from '../Header'
import {
    Container,
    Divider,
    Grid,
    Segment,
    Button
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
            handleUpdateJob
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
                        />
                        </Grid.Column>

                        <Grid.Column>
                        <RemindersContainer 
                            remindersArray={reminders} 
                            updateRemindersFromState={updateRemindersFromState}
                            deleteReminderFromState={deleteReminderFromState}
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
                />
            </div>
        )
    }
}

export default Home