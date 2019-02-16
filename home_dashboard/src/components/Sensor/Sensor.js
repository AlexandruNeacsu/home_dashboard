import React from 'react';
import { Grid, Segment, Header, Icon, Container } from 'semantic-ui-react';


const Sensor = props => {
    const name = props.name;
    const value = Math.round(props.value * 10) / 10;    //to keep 1 decimal point
    const type = props.type;
    return (
        <Segment  textAlign='center'>
            <Container>
                <Header as="h1" >
                    <Header.Content>
                        <Icon size='large' name={type === "temp" ? "thermometer half" : "tint"}/>
                        {type === "temp" ? /*<p> &deg;C</p>*/ value + "ºC" : value + "%"}
                    <Header.Subheader>{name}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Container>
        </Segment>
    );
}

export default Sensor;