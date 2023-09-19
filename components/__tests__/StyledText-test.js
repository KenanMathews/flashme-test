import React from 'react';
import renderer from 'react-test-renderer';
import ModalScreen from '../../app/modal';
import {expect, jest, test} from '@jest/globals';

test('renders correctly', () => {
  const tree = renderer.create(<ModalScreen />).toJSON();
  expect(tree).toMatchSnapshot();
  
});