import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, withOrientation} from 'react-navigation';
import NavigationUtil from '../navigators/NavigationUtil';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.tabName = ['Store', 'Mall'];
  }

  genTab = () => {
    const tabs = {};
    this.tabName.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <Home {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });

    return tabs;
  };


  render() {
    const TopTabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this.genTab(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: '#1E90FF',
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      }),
    );
    return (
      <View style={styles.container}>
        <TopTabNavigator />
      </View>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <View>
        <Text>home</Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage({}, 'DetailPage');
          }}>
          detail
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 20,
    marginTop: 6,
    marginBottom: 6,
  },
});
