import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainPage from '../pages/MainPage';
import WelcomePage from '../pages/WelcomePage';
import DetailPage from '../pages/DetailPage';

const InitNavigator = createSwitchNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MainNavigator = createStackNavigator({
  MainPage: {
    screen: MainPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  DetailPage: DetailPage
});

export default createAppContainer(
  createSwitchNavigator({
    init: InitNavigator,
    main: MainNavigator,
  }),
);
