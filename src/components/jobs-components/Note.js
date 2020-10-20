import React from 'react'
import { Item, Button } from 'semantic-ui-react'

class Note extends React.Component {

    handleDelete = () => {
        this.props.handleDeleteNote(this.props.note.id)
    }

    render() {

        return(
            <Item>
                <Button compact={true} icon={true} onClick={this.handleDelete}>
                x
                </Button>
                <Button compact={true} icon={true}>
                edit
                </Button>
                <Item.Content>
                    {this.props.note.content}
                </Item.Content>
            </Item>
        )

    }
    
}

export default Note