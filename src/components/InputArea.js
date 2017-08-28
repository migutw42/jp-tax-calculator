import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

import TaxCalculator from '../libs/TaxCalculator';

class TextFields extends Component {
  handleSubmit(event) {
    event.preventDefault();

    const formElement = event.target;
    const taxInfo = TaxCalculator.getTaxInfo(
      formElement.income.value,
      formElement.expenses.value
    );
    this.props.handleUpdate(taxInfo);
  }

  render() {
    return (
      <Card>
        <form onSubmit={event => this.handleSubmit(event)}>
          <CardContent>
            <div>
              <TextField
                label={TaxCalculator.translate('income')}
                name="income"
                type="number"
                defaultValue="0"
                inputProps={{ min: 0, step: 10000 }}
                margin="normal"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <TextField
                label={TaxCalculator.translate('expenses')}
                name="expenses"
                type="number"
                defaultValue="0"
                inputProps={{ min: 0, step: 10000 }}
                margin="normal"
                style={{ width: '100%' }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button type="submit">Calculate</Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

export default TextFields;
