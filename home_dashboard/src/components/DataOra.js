import React, {Component} from 'react';
import { Segment, Header, Grid } from 'semantic-ui-react';


class DataOra extends Component {
    state = {
        date: new Date()
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({date: new Date()}),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {

        const day = this.state.date.getDate();
        const month = this.state.date.getMonth() + 1;
        const year = this.state.date.getFullYear();

        return(
            <Grid.Column stretched width={6} textAlign="center" >
                <Segment >
                        <Header>
                            {day}/{month}/{year}
                        </Header>
                        <Header  as="h1">
                        <Header.Content >

                            {this.state.date.toLocaleTimeString('ro-RO')}
                        </Header.Content>
                    </Header>
                </Segment>
            </Grid.Column>
        );
    }
}

export default DataOra;