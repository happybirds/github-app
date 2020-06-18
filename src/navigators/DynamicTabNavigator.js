import React from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import MyPage from '../pages/MyPage';
import FavoritePage from '../pages/FavoritePage';
import HomePage from '../pages/HomePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

const TABS = {
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor, focused}) => (
        <Feather
        name={'github'}
        size={26}
        style={{color: tintColor}}
    />
      ),
    },
  },

  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
        tabBarLabel: "Favorite",
        tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
                name={'favorite-border'}
                size={26}
                style={{color: tintColor}}
            />
        ),
    }
}
,

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
    const {HomePage, FavoritePage, MyPage} = TABS;
    const tabs = {HomePage, FavoritePage, MyPage};
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