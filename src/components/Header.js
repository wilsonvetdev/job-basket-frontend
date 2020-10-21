import React from 'react'
import { Header} from 'semantic-ui-react'

const AppHeader = (props) => {

    return(
        <Header as='h1' inverted color='grey' textAlign='center'> 
            Job Basket - {props.jobs.length} jobs in your basket!
        </Header>
    )

}

export default AppHeader