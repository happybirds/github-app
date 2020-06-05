import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../navigators/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../action/index';
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.tabName = ['Java', 'Android', 'IOS', 'React'];
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

const pageSize = 10;
class PopularTab extends React.Component {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this.loadData();
  }
  loadData(loadMore) {
    const {onRefreshPopular, onLoadMorePopular} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        (callBack) => {
          this.refs.toast.show('no more');
        },
      );
    } else {
      onRefreshPopular(this.storeName, url, pageSize);
    }
  }

  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true,
      };
    }
    return store;
  }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {}} />;
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>Loading</Text>
      </View>
    );
  }
  render() {
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={(data) => this.renderItem(data)}
          keyExtractor={(item) => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('----onEndReached---');
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
            console.log('----onMomentumScrollBegin-------');
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  popular: state.popular,
});
const mapDispatchToProps = (dispatch) => ({
  onRefreshPopular: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        callBack,
      ),
    ),
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
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
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
