export default class FavoriteUtil {
  //hit favoriteIcon callback
  static onFavorite(favoriteDao, item, isFavorite, flag) {
    const key = item.id.toString();
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
    } else {
      favoriteDao.removeFavoriteItem(key);
    }
  }
}
