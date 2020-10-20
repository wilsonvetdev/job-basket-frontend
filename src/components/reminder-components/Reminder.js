import React from 'react'
import { Item, Icon, Header, Button } from 'semantic-ui-react'


const Reminder = (props) => {

    let { id, content } = props.reminder

    const handleClick = (event) => {
        props.handleDelete(id)
    }

    return(
        <Item>
            <Item.Content verticalAlign='middle'>
                <Header inverted color='grey'>{ content }</Header>
            </Item.Content>
            <button onClick={handleClick}>
                <Icon name='delete' size='small'/>
            </button>
        </Item>
    )


}

export default Reminder

