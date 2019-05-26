import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import imagine from "../images/logare.png"
const cookie = new Cookies();


class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    userError: false,
    serverError: false,
    loading: false
  }

  checkIfLoggedIn = () => {
    const token = cookie.get('token');
    if (token) {
      return true;
    }
    return false;
  }

  handleSubmit = () => {

    const {username, password} = this.state;
    const URL = this.props.url + 'auth/login/';
    this.setState({loading: true});
    axios({
        url: URL,
        method: "POST",
        data: {
          username,
          password
        },
        withCredentials: true
      })
      .then(res => {
        let expireDate = new Date();
        expireDate.setHours(expireDate.getHours() + 1);
        cookie.set("token", res.data.key, {expires: expireDate});
        
        //give the key to the parent, so it will not redirect again to "/login"
        this.props.setToken(res.data.key);
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({
            userError: true,
            loading: false
          })
        }else if (error.response.status === 500) {
          this.setState({
            serverError: true,
            loading: false
          })
        }
      })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const USER_ERROR = this.state.userError
    const SERVER_ERROR = this.state.serverError

    if(this.checkIfLoggedIn()) { return <Redirect to="/" /> }

    return (
      <div className='login-form'>
        {/* all the elements up to the `Grid` below must have a height of 100%.*/}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
	    background-image: url("${imagine}");
	    background-repeat: no-repeat;
	    background-size: auto;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              H.A.R.I.
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} error={SERVER_ERROR} warning={USER_ERROR}>
              <Segment stacked loading={this.state.loading}>
                <Form.Input 
                fluid 
                name="username"
                value={this.state.username}
                icon='user'
                iconPosition='left'
                placeholder='Nume Utilizator'
                onChange={this.handleChange}
                error={USER_ERROR}
                />
                <Form.Input
                  fluid
                  name="password"
                  value={this.state.password}
                  icon='lock'
                  iconPosition='left'
                  placeholder='Parola'
                  type='password'
                  onChange={this.handleChange}
                  error={USER_ERROR}
                />

                <Button color='teal' fluid size='large'>
                  Logare
                </Button>
              </Segment>

              <Message error hidden={SERVER_ERROR} header="Eroare server" content="Incearca mai tarziu!"/>
              <Message warning  header="Numele sau parola sunt gresite" content="Incearca din nou!" />

            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default LoginForm
