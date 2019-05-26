import React, { Component } from 'react';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import axios from 'axios';

export default class Logout extends Component {

    logout = () => {
        const Cookie = new Cookies();
        const URL = this.props.url +  'auth/logout/';
        const token = Cookie.get("token")
        Cookie.remove("token")
	Cookie.remove('csrftoken')
        axios.post(URL,{}, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(error => console.log(error))

    }

    render() {
        return (
            <Grid.Column >
                <Segment onClick={this.logout} className="hvr-grow" textAlign="center">
                    <Header as="h5" icon>
                        <Icon name="power"/>
                        <Header.Content>Logout</Header.Content>
                    </Header>
                </Segment>
            </Grid.Column>    
        );
        
    }
}
