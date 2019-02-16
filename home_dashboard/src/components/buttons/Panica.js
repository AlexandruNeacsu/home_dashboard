import React, { Component } from 'react';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import axios from 'axios';

export default class Logout extends Component {
    
    componentDidMount() {
        const URL = this.props.url + 'dashboard/switches/17';
        const Cookie = new Cookies();
        const token = Cookie.get("token");
        axios.get(URL,
            {
                headers:{
                    Authorization: `Token ${token}`
                },
            })
        .then(response => {
            console.log(response)
            this.setState({
                button: response.data,
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    handleClick = () => {
        const Cookie = new Cookies();
        const URL = this.props.url +  'dashboard/switches/17';
        const token = Cookie.get("token")
        axios(URL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get('csrftoken'),
                "Authorization": `Token ${Cookie.get("token")}`
            },
            data : {
                "on" : !this.state.on
            },
            
        })
        .then(res => {
            window.location.reload()
        })

    }

    render() {
        return (
            <Grid.Column >
                <Segment onClick={this.handleClick} className="hvr-grow" textAlign="center">
                    <Header as="h5" icon>
                        <Icon name="warning sign"/>
                        <Header.Content>Panica</Header.Content>
                    </Header>
                </Segment>
            </Grid.Column>    
        );
        
    }
}