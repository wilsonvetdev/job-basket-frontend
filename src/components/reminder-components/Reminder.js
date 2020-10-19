import React from 'react'

class Reminder extends React.Component {

    render(){
        console.log(this.props)
        return(
            <p>{ this.props.reminder.content }</p>
        )
    }
}

export default Reminder