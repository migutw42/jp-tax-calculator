import React from 'react';
import { shallow } from 'enzyme';
import TextFields from './TextFields';

it('renders without crashing', () => {
  shallow(<TextFields />);
});
