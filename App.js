import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Splash from "./src/components/Splash";
import Game from "./src/components/Game";

export default class App extends React.Component {
  render() {
    const RootStack = createStackNavigator(
      {
        Home: Splash,
        Game: Game
      },
      {
        initialRouteName: "Home"
      }
    );
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
