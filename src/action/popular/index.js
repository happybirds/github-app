import Types from '../types'
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore'
import {_projectModels, handleData} from '../ActionUtil'

//on refresh get more star 
export function onRefreshPopular(storeName, url, pageSize,favoriteDao) {
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize,favoriteDao)
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName,
                    error
                });
            })
    }
}

//load more 
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [],favoriteDao, callBack) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {//load all datas
                if (typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                })
            } else {
                //load max count 
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max),favoriteDao,data=>{
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: data,
                    })
                })
            }
        }, 500);
    }
}

//flush favorite state
export function onFlushPopularFavorite(storeName, pageIndex, pageSize, dataArray = [], favoriteDao) {
    return dispatch=>{
        //load max count 
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModels(dataArray.slice(0, max),favoriteDao,data=>{
            dispatch({
                type: Types.FLUSH_POPULAR_FAVORITE,
                storeName,
                pageIndex,
                projectModels: data,
            })
        })
    }
}