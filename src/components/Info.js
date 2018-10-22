import React, { Component } from 'react';
import { View, Text, Button, Animated, Dimensions, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
class En extends Component {
  render() {
    const {enemy} = this.props;
    return (
      <Animated.View
        style={[{
          position:'absolute',
          width: (SCREEN_WIDTH/3),
          height: (SCREEN_WIDTH/3),
          backgroundColor:'white',
        },this.props.style]}
        >
        <TouchableOpacity style={styles.startTouchable} onPress={() => this.props.start()} >
          <Text style={styles.startText}> {this.props.text} </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default En;

const styles = {
  startText: {
    color: 'blue',
    fontSize: 35
  },
  startTouchable:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
};
/*
<Animated.View style={{position:'absolute', width: (SCREEN_WIDTH/3), height: (SCREEN_WIDTH/3), backgroundColor:'white', transform: [{ translateY: this.state.start }, {translateX: (SCREEN_WIDTH/2)}, {rotate: spinText}]}}>
  <TouchableOpacity style={styles.startTouchable} onPress={() => this.startGame()} >
    <Text style={styles.startText}> {this.state.startText} </Text>
  </TouchableOpacity>
</Animated.View>
*/
