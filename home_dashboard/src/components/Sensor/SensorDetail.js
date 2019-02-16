import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react';

import Sidemenu from '../Sidemenu';
import SensorGraph from './SensorGraph';
import axios from 'axios';
import Cookies from 'universal-cookie';

function checkID (object, ID) {
    return object.id === ID;
}

class SensorDetail extends Component {
    state = {sensors: []}

    componentDidMount() {
        const URL = this.props.url + 'dashboard/sensors/';

        const Cookie = new Cookies();
        const token = Cookie.get("token");

        axios.get(URL , {
                 headers: {
                     Authorization: `Token ${token}`
                 }
            })
       .then(res => {
            let promises = [];
            let sensors = res.data;
            sensors.forEach(sensor => {
                promises.push(axios.get(URL + `${sensor.id}/values/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }));
            })
            Promise.all(promises)
            .then(responseList => {
                responseList.forEach(response => {
                    const data = response.data;
                    if (data.length > 0) {
                        const sensorID = data[0].sensor;             
                        let values = []; 
                        data.forEach(obj => {
                            values.push({id: obj.id, value: obj.value});
                        })
                        const index = sensors.findIndex(obj => checkID(obj, sensorID));
                        sensors[index].values = values;
                    }
                })
                this.setState({sensors})
            })
            .catch(error => {console.log(error)})
        })
        .catch(error => console.log(error.response))        
    }


    render() {
        return (
            <div>
                <Container>
                    <Sidemenu />

                    <Grid padded='horizontally'>
                        {
                            this.state.sensors && this.state.sensors.map(obj => {
                                return (
                                    <SensorGraph 
                                    id={obj.id} //div id for the chart 
                                    name={obj.name} 
                                    type={obj.type} 
                                    key={obj.id} 
                                    values={obj.values}


                                    />
                                )

                            })
                        }


                        {/* <SensorGraph id={1} name={'Temperatura Interior'} value={30} label={'ºC'}/>
                        <SensorGraph id={3} name={'Umiditate Interior'} value={50} label={'%'} />
                        <SensorGraph id={2} name={'Temperatura Exterior'} value={-4} label={'ºC'} /> */}
                        </Grid>
                    </Container>    

            </div>
                   
        )
    }
}


export default SensorDetail;
