import React from 'react'

class Note extends React.Component {

    render() {

        return(
            <p>{this.props.note.content}</p>
        )

    }
    
}

export default Note