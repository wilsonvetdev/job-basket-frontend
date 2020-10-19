import React from 'react'
import Note from './Note'

const NotesContainer = (props) => {

    let arrayOfNotesComponents = props.notesArray.map((noteObj) => {
        return <Note key={noteObj.id} note={noteObj} />
    })

    return(
        <div>
            <h1>Notes</h1>
            { arrayOfNotesComponents }
        </div>
    )
}

export default NotesContainer