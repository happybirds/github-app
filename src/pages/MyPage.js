import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import actions from '../action'

class MyPage extends React.Component {


  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>MyPage</Text>
        <Button
        title={'change color'}
        onPress={()=>{
         this.props.onThemeChange('black')
        
        }
        }

        />
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

const mapDispatchToProps = dispatch =>({
  onThemeChange: theme=>dispatch(actions.onThemeChange(theme))
})

export default connect(null,mapDispatchToProps)(MyPage);