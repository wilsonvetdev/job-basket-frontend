import React from 'react'
import { Select } from 'semantic-ui-react'

class Sort extends React.Component{

    handleChange = (event) => {
        this.props.changeJobStatus(event.target.innerText)
    }


    render(){

        const statusOptions = [
            { key: 'l', text: 'all jobs', value: 'all jobs'},
            { key: 'n', text: 'not applied', value: 'not applied'},
            { key: 'a', text: 'applied', value: 'applied'},
            { key: 'i', text: 'interviewed', value: 'interviewed'},
            { key: 'o', text: 'offered', value: 'offered'},
            { key: 'h', text: 'hired', value: 'hired'}
        ]

        return(
            <Select
                onChange={this.handleChange}
                options={statusOptions}
                placeholder={this.props.jobStatus}
            />
        )
    }
}

export default Sort