import React from 'react';
import DynamicTabNavigator from '../navigators/DynamicTabNavigator'
import NavigationUtil from '../navigators/NavigationUtil';

export default class MainPage extends React.Component {

  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
  }
}
