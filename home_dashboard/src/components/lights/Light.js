import React from 'react'
import { Icon, Segment, Header } from 'semantic-ui-react'

const Light = props => {
    const light_color = props.on ? "yellow" : "black";
    const name = props.on ? "lightbulb" : "lightbulb outline";

    return (
        <Segment onClick={props.onClick} inverted color='grey'>
            <Header icon textAlign='center'> 
                <Header.Content>
                    <Icon name={name} color={light_color} size="big" inverted/>           
                    {props.name}
                </Header.Content>
            </Header>
        </Segment>

        );

}

export default Light;