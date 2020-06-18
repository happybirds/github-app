import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

export default class FavoritePage extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>OrderPage</Text>
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
