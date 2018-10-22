import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Enemy from "./Enemy";
import Info from "./Info";
import Heroe from "./Heroe";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
class Position extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      play: false,
      playerWidth: 50,
      playerHeight: 50,
      playerY: SCREEN_HEIGHT - 100,
      enemySpeed: 4200,
      startText: "Play",
      score: 0,
      enemiesCount: 0,
      playerSide: "Center", //start by center, UpperCase

      pan: new Animated.ValueXY({
        x: SCREEN_WIDTH / 2 - 25, //25 is half of the ball size to be at the exact middle
        y: SCREEN_HEIGHT - 100
      }),
      start: new Animated.Value(SCREEN_HEIGHT / 2),

      listEnemies: [
        {
          id: 0,
          moveEnemy: new Animated.Value(-200),
          enemyX: 0,
          color: "white",
          side: "Left"
        },
        {
          id: 1,
          moveEnemy: new Animated.Value(-200),
          enemyX: SCREEN_WIDTH / 3,
          color: "white",
          side: "Center"
        },
        {
          id: 2,
          moveEnemy: new Animated.Value(-200),
          enemyX: SCREEN_WIDTH - SCREEN_WIDTH / 3,
          color: "white",
          side: "Right"
        }
      ]
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: (event, gesture) => {
        return (Animated.event([
          null,
          { dx: this.state.pan.x, dy: this.state.pan.y }
        ])(event, gesture): null);
      },

      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset(gesture);

        if (gesture.moveX < SCREEN_WIDTH / 3) {
          this.setState({ playerSide: "Left" });
          this.movePlayer({
            x: SCREEN_WIDTH / 6 - this.state.playerWidth / 2,
            y: this.state.playerY
          }); //left
        } else if (
          gesture.moveX > SCREEN_WIDTH / 3 &&
          gesture.moveX < SCREEN_WIDTH - SCREEN_WIDTH / 3
        ) {
          this.setState({ playerSide: "Center" });
          this.movePlayer({
            x: SCREEN_WIDTH / 2 - this.state.playerWidth / 2,
            y: this.state.playerY
          }); //center
        } else {
          this.setState({ playerSide: "Right" });
          this.movePlayer({
            x: SCREEN_WIDTH - SCREEN_WIDTH / 6 - this.state.playerWidth / 2,
            y: this.state.playerY
          }); //right
        }
      }
    });
  }

  movePlayer = direction => {
    Animated.spring(this.state.pan, {
      toValue: direction,
      tension: 120
    }).start();
  };

  animated = enemy => {
    enemy.setValue(-200);
    setTimeout(() => {
      if (this.state.play) {
        Animated.timing(enemy, {
          toValue: SCREEN_HEIGHT,
          duration: this.state.enemySpeed
        }).start(event => {
          if (this.state.play) {
            clearInterval(refreshIntervalId);
            //clearInterval(scoreUp);
            this.setState({ score: ++this.state.score });
            this.animated(enemy);
          }
        });
      }
    }, Math.floor(Math.random() * 4000));

    const scoreUp = setInterval(() => {
      this.setState({ enemySpeed: this.state.enemySpeed - 50 });
    }, 20000);

    const refreshIntervalId = setInterval(() => {
      //Collision logic
      if (this.state.play) {
        this.state.listEnemies.map(enemy => {
          //if enemy collises with player and they are on the same enemySide
          // -- and the enemy has not passed the player safely
          if (
            ((enemy.moveEnemy._value + SCREEN_WIDTH / 3 > SCREEN_HEIGHT - 100 &&
              enemy.moveEnemy._value + SCREEN_WIDTH / 3 < SCREEN_HEIGHT - 50) ||
              (enemy.moveEnemy._value > SCREEN_HEIGHT - 100 &&
                enemy.moveEnemy._value < SCREEN_HEIGHT - 50)) &&
            this.state.playerSide == enemy.side
          ) {
            this.setState({ play: false }); //stop de game
            clearInterval(refreshIntervalId); //refresh the interval
            clearInterval(scoreUp);
            this.stopEnemiesAnimation(); //stopAnimation fo enemies
            this.moveStart(SCREEN_HEIGHT / 2); //make appear the restart cube
          }
        });
      }
    }, 50);
  };

  animateEnemy = () => {
    this.state.listEnemies.map((enemy, i) => {
      if (i == 2) {
        //for the third keep 1 sec more to avoid to loose straight
        setTimeout(() => {
          this.animated(enemy.moveEnemy);
        }, 3000);
      } else {
        this.animated(enemy.moveEnemy);
      }
    });
  };

  stopEnemiesAnimation = () => {
    this.state.listEnemies.map(enemy => {
      enemy.moveEnemy.stopAnimation();
    });
  };

  renderEnemies = () => {
    return this.state.listEnemies.map(enemy => {
      return <Enemy key={enemy.id} enemy={enemy} />;
    });
  };

  moveStart = direction => {
    Animated.spring(this.state.start, {
      toValue: direction,
      tension: 120
    }).start();
  };

  startGame = () => {
    //not when the game is started for the first time cause enemies not created
    if (this.state.startText === "Restart") {
      //get back all enemies to the top where hidden - has to be done here if not the third doesn't do it well because is retarded
      this.state.listEnemies.map(enemy => {
        enemy.moveEnemy.setValue(-200);
      });
    }
    //take back the cube restart or play
    this.moveStart(-200);
    //put back the boll to the middle
    this.state.pan.setValue({
      x: SCREEN_WIDTH / 2 - 25,
      y: this.state.playerY
    });
    //initialize states
    this.setState({
      play: true,
      playerSide: "Center",
      score: 0,
      enemySpeed: 4200
    });
    //launch the animations
    this.animateEnemy();
    //change the cube button from play to restart
    this.state.startText === "Play"
      ? this.setState({ startText: "Restart" })
      : null; //Play need to be shown only the first time
  };

  render() {
    const spinText = this.state.start.interpolate({
      inputRange: [0, 2],
      outputRange: ["0deg", "720deg"]
    });

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      width: this.state.playerWidth,
      height: this.state.playerWidth,
      transform: [
        { translateX: this.state.pan.x },
        { translateY: this.state.pan.y }
      ]
    };

    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "blue" }}
        >
          <View
            style={{ flex: 1, borderRightWidth: 2, borderRightColor: "white" }}
          />
          <View
            style={{ flex: 1, borderRightWidth: 2, borderRightColor: "white" }}
          />
          <View style={{ flex: 1 }} />
        </View>
        {this.renderEnemies()}
        <View
          style={{
            width: SCREEN_WIDTH,
            left: 0,
            top: SCREEN_HEIGHT / 2,
            position: "absolute",
            alignItems: "center"
          }}
        >
          <Text style={styles.scoreText}>{this.state.score}</Text>
        </View>

        <Info
          start={this.startGame}
          text={this.state.startText}
          style={{
            transform: [
              { translateY: this.state.start },
              { translateX: SCREEN_WIDTH / 2 },
              { rotate: spinText }
            ]
          }}
        />

        <Heroe
          style={{
            width: this.state.playerWidth,
            height: this.state.playerWidth,
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          pan={{ ...this._panResponder.panHandlers }}
        />
      </View>
    );
  }
}

export default Position;

const styles = {
  container: {
    flex: 1
  },
  startText: {
    color: "blue",
    fontSize: 35
  },
  scoreText: {
    fontSize: 60,
    color: "white"
  },
  startTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  pan: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    backgroundColor: "white"
  }
};
