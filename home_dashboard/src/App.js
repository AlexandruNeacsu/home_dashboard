import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Route, Redirect, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import SensorDetail from './components/Sensor/SensorDetail';

import './App.css';
require('dotenv').config()

const cookie = new Cookies();
const BASE_URL = 'http://localhost:8000/';


class App extends Component {
  state = {
    token: cookie.get("token"),
    userError: false,
    serverError: false,
  }

  setToken = token => {
    this.setState({token})
  }


  render() {
    return (
      <div>

        <Switch>
          <PrivateRoute exact path='/' component={LandingPage} token={this.state.token} />
          <Route path='/login' 
                render={() => 
                  <LoginForm url={BASE_URL} setToken={this.setToken}/> 
                  } 
          />
          <Route to='/sensors/' render={() => <SensorDetail url={BASE_URL}/>} />
        </Switch>

      </div>
    );
  }
}


const PrivateRoute = ({component: MyComponent, token, authedProps, ...rest}) => {
  return(
    <Route 
    {...rest} 
    render={() => token ? <MyComponent url={BASE_URL}/> : <Redirect to="/login"/>} />
  )
}

export default App;
