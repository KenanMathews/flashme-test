// components/Testable.js
import React from 'react';
import { View, Text } from 'react-native';
import { Consumer } from './Context';
const Testable = props => (
  <Consumer>
    {value => (
      <View>
        <Text>{value} & {props.pair}</Text>
      </View>
    )}
  </Consumer>
);
export default Testable;