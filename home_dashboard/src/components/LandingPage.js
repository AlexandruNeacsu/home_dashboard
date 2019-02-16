import Sidemenu from './Sidemenu';
import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import LightRow from './lights/LightRow';
import SocketRow from './sockets/SocketRow';
import SensorRow from './Sensor/SensorRow'
import Weather from './Weather';
import DataOra from './DataOra';
import Logout from './buttons/Logout';
import Panica from './buttons/Panica';


const LandingPage = props => {
  const BASE_URL = props.url;

  return (
    <div>
      <Sidemenu >

      <Grid >
        <Grid.Row centered>
            <DataOra zi="01" luna="01" an="2018"/>
            <Weather url={BASE_URL} />
            <Logout url={BASE_URL} />
            <Panica url={BASE_URL} />
        </Grid.Row>
        <SensorRow url={BASE_URL} />
        <LightRow url={BASE_URL} />
        <SocketRow url={BASE_URL} />


        {/* {<a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>} */}
      </Grid>
      </Sidemenu>
    </div>
  );
}

export default LandingPage;
