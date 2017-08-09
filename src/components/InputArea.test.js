import React from 'react';
import { shallow } from 'enzyme';
import InputArea from './InputArea';

it('renders without crashing', () => {
  shallow(<InputArea />);
});
