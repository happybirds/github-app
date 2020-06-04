import React from 'react';
import {View, Button, Text, StyleSheet,FlatList,RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, withOrientation} from 'react-navigation';
import NavigationUtil from '../navigators/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../action/index';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
const THEME_COLOR = 'red';
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.tabName = ['Java', 'Android','IOS','React'];
  }

  genTab = () => {
    const tabs = {};
    this.tabName.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <PopularTabPage {...props} tabLabel={item} />,
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

class PopularTab extends React.Component {
  constructor(props){
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;

  }

  componentDidMount(){
    this.loadData();
  }
  loadData(){
    const {onLoadPopularData} = this.props;
    const url = this.genFetchUrl(this.storeName);
    onLoadPopularData(this.storeName,url);
  }
  genFetchUrl(key){
    return URL + key + QUERY_STR;
  }

  renderItem(data){
    const item = data.item;
    console.log(66666666666)
    return <View style={{marginBottom: 10}}>
  <Text style={{backgroundColor:'#faa'}}>{JSON.stringify(item)}</Text>
      </View>

  }
  render() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    console.log(store);
    if(!store){
      store = {
        items:[],
        isLoading: false,
      }
    }

    return (
      <View style={styles.container}>
       <FlatList
        data = {store.items}
        renderItem={data=>this.renderItem(data)}
        keyExtractor={item=>""+item.id}
        refreshControl={
          <RefreshControl
          title={'Loading'}
          titleColor={THEME_COLOR}
          colors={[THEME_COLOR]}
          refreshing={store.isLoading}
          onRefresh={()=> this.loadData()}
          tintColor = {THEME_COLOR}

          />
        }
       />
        
      </View>
    );
  }
}
const mapStateToProps = state =>({
  popular: state.popular
})
const mapDispatchToProps = dispatch =>({
  onLoadPopularData: (storeName,url)=>dispatch(actions.onLoadPopularData(storeName,url))
})
const PopularTabPage = connect(mapStateToProps,mapDispatchToProps)(PopularTab)
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
