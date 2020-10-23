import React from 'react'
import { Segment, Container, Button} from 'semantic-ui-react'

const LinkToGithub = () => {

    return(
        <footer>
            <Segment inverted>
                <Container>
                    <Button 
                    as='a'
                    href='https://github.com/wilsonvetdev'
                    target="_blank"> 
                    Made By Wilson - Click to check out Github
                    </Button>
                </Container>
            </Segment>
        </footer>
    )
}

export default LinkToGithub