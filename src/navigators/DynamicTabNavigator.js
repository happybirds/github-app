import React from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import MyPage from '../pages/MyPage';
import SearchPage from '../pages/SearchPage';
import HomePage from '../pages/HomePage';
import OrderPage from '../pages/OrderPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const TABS = {
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'home'} size={26} style={{color: tintColor}} />
      ),
    },
  },

  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({tintColor, focused}) => (
        <FontAwesome name={'search'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  OrderPage: {
    screen: OrderPage,
    navigationOptions: {
      tabBarLabel: 'Order',
      tabBarIcon: ({tintColor, focused}) => (
        <FontAwesome name={'reorder'} size={26} style={{color: tintColor}} />
      ),
    },
  },

  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({tintColor, focused}) => (
        <FontAwesome name={'user-o'} size={26} style={{color: tintColor}} />
      ),
    },
  },
};

 class DynamicTabNavigator extends React.Component {
  tabNavigator = () => {
    if(this.Tabs){
      return this.Tabs;
    }
    const {HomePage, SearchPage, OrderPage, MyPage} = TABS;
    const tabs = {HomePage, SearchPage, OrderPage, MyPage};
    return this.Tabs = createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: props=>{
          return <TabBarComponent {...props} theme={this.props.theme}/>
        },
      }),
    );
  };

  render() {
    const TabNavigator = this.tabNavigator();
    return <TabNavigator />;
  }
}

class TabBarComponent extends React.Component {
  render() {
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.props.theme}
      />
    );
  }
}


const mapStateToProps = state =>({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(DynamicTabNavigator);