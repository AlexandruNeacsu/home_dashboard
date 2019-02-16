import React from 'react';
import {Segment, Header, Icon } from 'semantic-ui-react';

const Socket = (props) => {
    const socket_color = props.on ? "green" : "red";

    return (
        <Segment onClick={props.onClick} inverted color='grey' >
            <Header icon textAlign='center'> 
                <Header.Content>
                    <Icon name='power cord' size="big" inverted color={socket_color} />
                    {props.name}
                </Header.Content>
            </Header>
        </Segment>
        );

}

export default Socket;