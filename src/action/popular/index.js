import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

export  function onLoadPopularData(storeName,url){
  return dispath =>{
    dispath({type: Types.POPULAR_REFRESH, storeName: storeName});
    let dataStore = new DataStore();
    dataStore.fetchDate(url) //异步action与数据流
    .then(data=>{
      handleData(dispath,storeName,data);
    }).catch(error=>{
      console.log(error);
      dispath({
        type: Types.LOAD_POPULAR_FAIL,
        storeName,
        error
      });
    })
  }
}

function handleData(dispath,storeName,data){
  dispath({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })

}