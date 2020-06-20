import React, {Component} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigators/NavigationUtil';
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#2196f3';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.tabName = ['React', 'PHP', 'C#', 'TypeScript', 'Ruby'];
  }

  genTab = () => {
    const tabs = {};
    const {theme} = this.props;
    this.tabName.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => (
          <PopularTabPage {...props} tabLabel={item} theme={theme} />
        ),
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
            backgroundColor: '#2196f3',
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
const mapPopularStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapPopularStateToProps)(HomePage);

const pageSize = 10;
class PopularTab extends React.Component {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
    this.isFavoriteChanged = false;
  }

  componentDidMount() {
    this.loadData();
    EventBus.getInstance().addListener(
      EventTypes.favorite_changed_popular,
      (this.favoriteChangeListener = () => {
        this.isFavoriteChanged = true;
      }),
    );
    EventBus.getInstance().addListener(
      EventTypes.bottom_tab_select,
      (this.bottomTabSelectListener = (data) => {
        if (data.to === 0 && this.isFavoriteChanged) {
          this.loadData(null, true);
        }
      }),
    );
  }

  loadData(loadMore, refreshFavorite) {
    const {
      onRefreshPopular,
      onLoadMorePopular,
      onFlushPopularFavorite,
    } = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
        (callback) => {
          this.refs.toast.show('no more');
        },
      );
    } else if (refreshFavorite) {
      onFlushPopularFavorite(
        this.storeName,
        store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
      );
    } else {
      onRefreshPopular(this.storeName, url, pageSize, favoriteDao);
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

    return (
      <PopularItem
        projectModel={item}
        theme={'1E90FF'}
        onSelect={(callback) => {
          NavigationUtil.goPage(
            {
              projectModel: item,
              flag: FLAG_STORAGE.flag_popular,
              callback,
            },
            'DetailPage',
          );
        }}
        onFavorite={(item, isFavorite) =>
          FavoriteUtil.onFavorite(
            favoriteDao,
            item,
            isFavorite,
            FLAG_STORAGE.flag_popular,
          )
        }
      />
    );
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
          data={store.projectModels}
          renderItem={(data) => this.renderItem(data)}
          keyExtractor={(item) => '' + item.item.id}
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
  onRefreshPopular: (storeName, url, pageSize, favoriteDao) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (
    storeName,
    pageIndex,
    pageSize,
    items,
    favoriteDao,
    callBack,
  ) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
        callBack,
      ),
    ),
  onFlushPopularFavorite: (
    storeName,
    pageIndex,
    pageSize,
    items,
    favoriteDao,
  ) =>
    dispatch(
      actions.onFlushPopularFavorite(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
      ),
    ),
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: '#2196f3',
    margin: 10,
  },
});
