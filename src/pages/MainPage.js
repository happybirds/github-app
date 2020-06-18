import React from 'react';
import DynamicTabNavigator from '../navigators/DynamicTabNavigator'
import NavigationUtil from '../navigators/NavigationUtil';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';

export default class MainPage extends React.Component {

  render() {

    NavigationUtil.navigation = this.props.navigation;
    return <SafeAreaViewPlus
            topColor={'#1E90FF'}
        >
            <DynamicTabNavigator/>
        </SafeAreaViewPlus>;
  }
}
