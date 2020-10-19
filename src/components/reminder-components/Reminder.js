import React from 'react'

class Reminder extends React.Component {

    render(){
        return(
            <p className='reminder'>{ this.props.reminder.content }</p>
        )
    }
}

export default Reminder