import React from 'react'
import { Item, Button } from 'semantic-ui-react'


const Reminder = (props) => {

    let { id, content } = props.reminder

    const handleClick = (event) => {
        props.handleDelete(id)
    }

    return(
        <Item>
            <Item.Content><p className='reminderItem'>{ content }</p></Item.Content>
            <Button icon={true} compact={true} onClick={handleClick}>
                x
            </Button>
        </Item>
    )


}

export default Reminder

