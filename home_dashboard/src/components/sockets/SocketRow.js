import React, { Component } from 'react';
import {Grid, Segment, Icon, Header, Container} from 'semantic-ui-react';
import Socket from  './Socket';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class SocketRow extends Component {
    state = {
        sockets: [],
        loading: true,
        error: false,
    }

    handleClick = (id) => {
        const URL = this.props.url + `dashboard/switches/${id}`;
        const object = this.state.sockets.find(obj => {return obj.id === id});
        const Cookie = new Cookies();

        axios(URL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookie.get('csrftoken'),
                "Authorization": `Token ${Cookie.get("token")}`
            },
            data : {
                "on" : !object.on
            },
            
        })
        .then(res => {
             //update state with new light on/off
            let newSockets = this.state.sockets;
            let i = newSockets.findIndex(obj => {return obj.id === id});
            newSockets[i].on = !newSockets[i].on;
            this.setState({
                sockets: newSockets
            })
        })
        .catch(error => {console.error(error)})
    }

    componentDidMount() {
        const URL = this.props.url + 'dashboard/switches/socket';
        const Cookie = new Cookies();
        const token = Cookie.get("token");
        axios.get(URL,
            {
                headers:{
                    Authorization: `Token ${token}`
                },
            })
        .then(response => {
            this.setState({
                sockets: response.data,
                loading: false
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({
                loading: false,
                error: true,
            })
        })
    }

    render() {
        const segmentWidth = Math.floor(16 / this.state.sockets.length);

        return (
            <Grid.Row centered>
                {
                    this.state.loading ? 
                        <Segment loading /> 
                        :
                        (
                            this.state.error ?
                                <Segment as={Container} basic>
                                    <Header icon>
                                        <Icon name='times circle' />
                                        An error has ocured loading sockets

                                    </Header>
                                </Segment>
                                :
                                this.state.sockets.map(obj => 
                                    <Grid.Column key={obj.id} width={segmentWidth} className="hvr-grow">
                                        <Socket name={obj.name} on={obj.on} onClick={() => this.handleClick(obj.id)} />
                                    </Grid.Column>
                                )
                        )
                    
                }
            </Grid.Row>
        );
  }
}
