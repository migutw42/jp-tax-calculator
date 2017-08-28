import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import InputArea from './InputArea';
import TableArea from './TableArea';

class App extends Component {
  state = {
    data: {}
  };

  handleUpdate(data) {
    this.setState({ data });
  }

  render() {
    return (
      <div style={{ backgroundColor: '#eeeeee', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              jp-tax-calculator
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '0.5em' }}>
          <Grid container justify={'center'}>
            <Grid item xs={12} sm={4}>
              <InputArea handleUpdate={data => this.handleUpdate(data)} />
            </Grid>
          </Grid>
          <Grid
            container
            justify={'center'}
            style={
              Object.keys(this.state.data).length !== 0
                ? {}
                : { display: 'none' }
            }
          >
            <Grid item xs={12} sm={4}>
              <TableArea data={this.state.data} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
