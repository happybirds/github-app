import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Utils";

// utils - handle data
export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao,params) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }
    }
    // first time,load data
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
    _projectModels(showItems,favoriteDao,projectModels=>{
        dispatch({
            type: actionType,
            items: fixItems,
            projectModels:projectModels,
            storeName,
            pageIndex: 1,
            ...params
        })
    });
}

//favorite model
export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        //get favorite key
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        console.log(e);
    }
    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
    }
    doCallBack(callback,projectModels);
}
export const doCallBack = (callBack, object) => {
    if (typeof callBack === 'function') {
        callBack(object);
    }
};
