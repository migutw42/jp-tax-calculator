import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TextFields from './TextFields';

import Grid from 'material-ui/Grid';

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#eeeeee', height: '100vh' }}>
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
              <TextFields />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
