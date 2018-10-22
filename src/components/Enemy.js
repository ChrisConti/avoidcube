import React, { Component } from "react";
import { View, Text, Button, Animated, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
class Enemy extends Component {
  render() {
    const { enemy } = this.props;
    return (
      <Animated.View
        style={{
          position: "absolute",
          width: SCREEN_WIDTH / 3,
          height: SCREEN_WIDTH / 3,
          backgroundColor: enemy.color,
          transform: [
            { translateY: enemy.moveEnemy },
            { translateX: enemy.enemyX }
          ]
        }}
      />
    );
  }
}

export default Enemy;
