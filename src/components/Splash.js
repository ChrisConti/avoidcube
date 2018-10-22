import React, { Component } from 'react';
import { View, Text} from 'react-native';

class Splash extends Component {
  static navigationOptions = ({ navigation}) => {
    return {
      header: null,
    }
  }

  componentDidMount() {
    setTimeout(()=> this.props.navigation.navigate('Game'), 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewTop}>
          <View style={{width:100, height:100, backgroundColor:'white', borderRadius:100}} />
        </View>
        <View style={styles.viewCenter}>
          <Text style={{fontSize:100, color:'white'}}>VS</Text>
        </View>
        <View style={styles.viewBottom}>
          <View style={{width:100, height:100, backgroundColor:'white'}} />
        </View>
      </View>
    )
  }
}

const styles = {
  container:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'blue'
  },
  viewTop: {
    flex:1,
    justifyContent: 'center',
    alignItems:'flex-start',
    marginLeft:20
  },
  viewCenter: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  viewBottom: {
    flex:1,
    justifyContent: 'center',
    alignItems:'flex-end',
    marginRight:20
  }
}

export default Splash;
