import React from 'react'
import { Item, Icon } from 'semantic-ui-react'


class Reminder extends React.Component {

    render(){
        return(
            <Item>
                <Item.Content verticalAlign='middle'>
                    { this.props.reminder.content }
                </Item.Content>
                <button><Icon name='delete' size='small'/></button>
            </Item>
        )
    }
}

export default Reminder

