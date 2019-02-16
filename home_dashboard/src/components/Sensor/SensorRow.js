import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import Sensor from './Sensor'
import axios from 'axios';
import Cookies from 'universal-cookie';


export default class LightRow extends Component {
    state = {
        sensors: [],
    }

    componentDidMount() {
        const URL = this.props.url + 'dashboard/sensors/';
        const Cookie = new Cookies();
        axios.get(URL, {
            headers: {
                Authorization: `Token ${Cookie.get("token")}`
            }
        })
        .then(res => {
            this.setState({sensors: res.data})
        })
        .catch(error => {
            console.log(error)
        })

    }


    render() {
        return (
            <Grid.Row centered>
                {
                    this.state.sensors.map(obj =>
                        <Grid.Column key={obj.id} width={Math.floor(16 / this.state.sensors.length)}>
                            <Sensor name={obj.name} value={obj.last_value} type={obj.type} />
                        </Grid.Column>
                    )
                }
            </Grid.Row>
        );
  }
}
