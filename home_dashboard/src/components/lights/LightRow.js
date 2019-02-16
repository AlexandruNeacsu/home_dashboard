import React, { Component } from 'react';
import {Grid, Segment, Header, Icon, Container} from 'semantic-ui-react';
import Light from  './Light';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default class LightRow extends Component {
    state = {
        lights: [],
        loading: true,
        error: false,
    }

    componentDidMount() {
        const URL = this.props.url + 'dashboard/switches/light';
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
                lights: response.data,
                loading: false,
            })
        })
        .catch(error => {
            console.error(error.response)
            this.setState({
                loading:false,
                error: true
            });
        })
    }

    handleClick = (id) => {
        const URL = this.props.url + `dashboard/switches/${id}`;
        const object = this.state.lights.find(obj => {return obj.id === id});
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
        .then((res) => {
            //update state with new light on/off
            let newlights = this.state.lights;
            let i = newlights.findIndex(obj => {return obj.id === id});
            newlights[i].on = !newlights[i].on;
            this.setState({
                lights: newlights
            })
        })
        .catch(error => {console.log(error)})
    }


    render() {
        const segmentWidth = Math.floor(16 / this.state.lights.length);
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
                                        An error has ocured loading lights

                                    </Header>
                                </Segment>
                                :
                                this.state.lights.map(obj => 
                                    <Grid.Column key={obj.id} width={segmentWidth} className="hvr-grow">
                                        <Light name={obj.name} on={obj.on} onClick={() => this.handleClick(obj.id)} />
                                    </Grid.Column>
                                )
                        )
                }
            </Grid.Row>
        );
  }
}
