import React, {Component} from 'react';
import { Text, View, Animated } from 'react-native';

class Heroe extends Component {
  render() {
    return (
      <Animated.View
        style={[this.props.style, styles.pan]}
        {...this.props.pan}
      />
    )
  }
}

export default Heroe;

const styles = {
  pan:{
    position:'absolute',
    borderWidth: 2,
    borderColor:'black',
    borderRadius: 50,
    backgroundColor: 'white'
  }
};
