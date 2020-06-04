export default class NavigationUtil {
  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('main');
  }

  static goPage(params,page){
    const navigation = NavigationUtil.navigation;
    if(!navigation){
      Console.log('NavigationUtil.navigation can not be null');
    }
    navigation.navigate(
      page,
      {
        ...params
      }
    )
}

}