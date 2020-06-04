import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

export default class DetailPage extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>DetailPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome:{
    fontSize: 20,
    textAlign:'center',
  }
});
