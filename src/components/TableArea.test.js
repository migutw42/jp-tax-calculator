import React from 'react';
import { shallow } from 'enzyme';
import TableArea from './TableArea';

import TaxCalculator from '../libs/TaxCalculator';

it('renders without crashing', () => {
  const income = 100000;
  const expenses = 100;
  const data = TaxCalculator.getTaxInfo(income, expenses);

  shallow(<TableArea data={data} />);
});
