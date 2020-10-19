import React from 'react'

class Reminder extends React.Component {

    render(){
        return(
            <p>{ this.props.reminder.content }</p>
        )
    }
}

export default Reminder