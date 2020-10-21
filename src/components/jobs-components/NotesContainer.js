import React from 'react'
import Note from './Note'
import { Item } from 'semantic-ui-react'

const NotesContainer = (props) => {

    let arrayOfNotesComponents = props.notesArray.map((noteObj) => {
        return <Note 
            key={noteObj.id} 
            note={noteObj} 
            handleDeleteNote={props.handleDeleteNote} 
            updateNote={props.updateNote}
        />
    })

    return(
        <Item.Group>
            <Item.Header><p>Notes:</p></Item.Header>
                { arrayOfNotesComponents }
        </Item.Group>
    )
}

export default NotesContainer