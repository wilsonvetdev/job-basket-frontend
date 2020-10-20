import React from 'react'
import Note from './Note'
import { Grid, Item } from 'semantic-ui-react'

const NotesContainer = (props) => {

    let arrayOfNotesComponents = props.notesArray.map((noteObj) => {
        return <Note 
            key={noteObj.id} 
            note={noteObj} 
            handleDeleteNote={props.handleDeleteNote} 
        />
    })

    return(
        <Grid columns={1} textAlign='center'>
            <Item.Group>
            <Item.Header><p>Notes:</p></Item.Header>
                { arrayOfNotesComponents }
            </Item.Group>
        </Grid>
    )
}

export default NotesContainer