import React, { Component } from 'react'
import { Segment, Icon, Header, Divider, Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import icons from '../images/index'


const matchIcon = (icon, reallySmall) => {
  switch (icon) {
    case "clear-day": return <Icon name="sun"/>;
    case "clear-night": return <Icon name="moon" />;
    case "rain": return <Image size="mini" verticalAlign="bottom"  src={icons.rain} style={reallySmall ? {width: "12%"} : {}}/>;
    case "snow": return <Image size="mini" verticalAlign="bottom" src={icons.snow} style={reallySmall ? {width: "12%"} : {}}/>;
    case "sleet": return <Image size="mini" verticalAlign="bottom" src={icons.sleet} style={reallySmall ? {width: "12%"} : {}}/>;
    case "wind": return <Image size="mini" verticalAlign="bottom" src={icons.wind} style={reallySmall ? {width: "12%"} : {}}/>;
    case "fog": return <Image size="mini" verticalAlign="bottom" src={icons.fog} style={reallySmall ? {width: "12%"} : {}}/>;
    case "cloudy": return <Image size="mini" verticalAlign="bottom" src={icons.cloudy} style={reallySmall ? {width: "12%"} : {}} />;
    case "partly-cloudy-day": return <Image size="mini" verticalAlign="bottom" src={icons.partly_cloudy_day} style={reallySmall ? {width: "12%"} : {}}/>;
    case "partly-cloudy-night": return <Image size="mini" verticalAlign="bottom" src={icons.partly_cloudy_night} style={reallySmall ? {width: "12%"} : {}}/>;
  }
}

export default class Weather extends Component {
  state = {
  }

  componentDidMount() {
    const URL = this.props.url + 'dashboard/weather/';
    const Cookie = new Cookies();
    axios.get(URL, {
      headers: {
        "Authorization": `Token ${Cookie.get("token")}`
      },
      withCredentials: true,
    })
    .then(response => {
      this.setState({data: response.data})
    })
    .catch(error => console.error(error)) // TODO
  }


  render() {
    return (
      <Grid.Column width={6}>
        <Segment textAlign="center">
          {this.state.data ? <Content data={this.state.data}/> : <Loading />}
          
        </Segment>
      </Grid.Column>
    )
  }
}

const Loading = props => 
  <div>
    <Segment loading />
    {/* <Divider fitted />
    <Segment loading /> */}
  </div>

const Content = (props) => 
  <div>
    <Header as='h1'>
      <Header.Content>

        

          {matchIcon(props.data.currently.icon)}
          <span style={{marginLeft: "0.4em"}}>
            {props.data.currently.currentTemperature}&deg;C
          </span>
          <Header.Subheader as='h5'>
            {props.data.currently.temperatureHigh}&deg; / {props.data.currently.temperatureLow}&deg;
            <Icon name="umbrella" style={{"paddingLeft": "0.5em"}} />
            {Math.trunc(props.data.currently.precipProbability * 100)}%
          </Header.Subheader>

      </Header.Content>
    </Header>

    <Divider fitted></Divider>

    <Header style={{"marginTop" : "0.5em"}}>
    <Header.Content>
      Mâine
      <Header.Subheader>

        <span style={{}}>
          {matchIcon(props.data.tomorrow.icon, true)}
        </span>
        {props.data.tomorrow.temperatureHigh}&deg; / {props.data.tomorrow.temperatureLow}&deg;
        <Icon name="umbrella" style={{"paddingLeft": "0.2em"}} />
        {Math.trunc(props.data.tomorrow.precipProbability * 100)}%

      </Header.Subheader>
    </Header.Content>
    </Header>
  </div>
