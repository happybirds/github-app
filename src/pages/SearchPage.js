import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  DeviceInfo,
  TouchableOpacity,
} from 'react-native';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import BackPressComponent from '../common/BackPressComponent';
import GlobalStyles from '../res/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigators/NavigationUtil';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.backPress = new BackPressComponent({
      backPress: (e) => this.onBackPress(e),
    });
  }

  componentDidMount() {
    this.backPress.componentDidMount();
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  onBackPress() {
    this.refs.input.blur();
    NavigationUtil.goBack(this.props.navigation);
    return true;
  }

  renderNavBar() {
    const {theme} = this.params;
    const placeholder = 'Enter';
    let backButton = ViewUtil.getLeftBackButton(() => this.onBackPress());
    let inputView = (
      <TextInput
        ref="input"
        placeholder={placeholder}
        style={styles.textInput}></TextInput>
    );
    let rightButton = (
      <TouchableOpacity
        onPress={() => {
          this.refs.input.blur();
        }}>
        <View style={{marginRight: 10}}>
          <Text style={styles.title}>{}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          backgroundColor: theme.themeColor,
          flexDirection: 'row',
          alignItems: 'center',
          height:
            Platform.OS === 'ios'
              ? GlobalStyles.nav_bar_height_ios
              : GlobalStyles.nav_bar_height_android,
        }}>
        {backButton}
        {inputView}
        {rightButton}
      </View>
    );
  }

  render() {
    const {theme} = this.params;
    let statusBar = null;
    if (Platform.OS === 'ios' && !DeviceInfo.isIPhoneX_deprecated) {
      statusBar = (
        <View style={[styles.statusBar, {backgroundColor: theme.themeColor}]} />
      );
    }

    return (
      <SafeAreaViewPlus topColor={theme.themeColor}>
        {statusBar}
        {this.renderNavBar()}
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: Platform.OS === 'ios' ? 26 : 36,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: 'white',
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 3,
    opacity: 0.7,
    color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
});
