import React, { Component } from 'react'
import { Grid, Header, Segment, Container, Statistic } from 'semantic-ui-react';

import { Chart } from "frappe-charts/dist/frappe-charts.esm.js"
import 'frappe-charts/dist/frappe-charts.min.css'


const labels = []        
for (let index = 0; index < 144; index++) {
    labels[index] = '';
    
}

class SensorGraph extends Component {
    state = {
        label: this.props.type === 'temp' ? 'ºC' :  '%' 
    }

    componentDidMount() {
        console.log(this.props)
        const ID = '#chart' + this.props.id; 
        const NAME = this.props.name;

        const values = Array.from(this.props.values, obj => obj.value);

        const chart = new Chart( ID, { // or DOM element
            data: {
            labels: labels,
        
            datasets: [
                {
                    values: values
                },
            ],
            },
            
            title: NAME,
            type: 'line', // or 'bar', 'line', 'pie', 'percentage'
            height: 300,
            colors: ['light-blue'],

            axisOptions:{
                xAxisMode: 'tick',
                xIsSeries: true,
            },
            lineOptions:{
                regionFill: 1,
                hideDots: true,
            },
        
            tooltipOptions: {
                formatTooltipX: d => this.props.type === 'temp' ? 'Temperature' :  'Humidity',
                formatTooltipY: d => d + ' ' +this.state.label,
            }
          });
    }

    render() {
        console.log("props:", this.props)
        const ID = 'chart' + this.props.id;
        const value = this.props.values[0].value;
        const label = this.state.label;

        return (
            <Grid.Row stretched as={Segment}>
                <Grid.Column width={14} id={ID} />

                <Grid.Column verticalAlign='middle' stretched width={2}>
                    <Container>
                        <Segment basic>
                            <Statistic horizontal size='small'> 
                                <Statistic.Value>{value}</Statistic.Value>
                                <Statistic.Label>{label}</Statistic.Label>
                            </Statistic>
                        </Segment>
                        <Header>{this.props.type === 'temp' ? 'Temperatura' : 'Temperatura'} curenta</Header>
                    </Container>            
                </Grid.Column>
        </Grid.Row>   
        );
    }
}


export default SensorGraph;
