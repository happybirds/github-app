import {AsyncStorage} from 'react-native';

export default class DataStore{
  fetchData(url){
    return new Promise((resolve,reject)=>{
      this.fetchLocalData(url).then((wrapData)=>{
        console.log(wrapData)
        if(wrapData && DataStore.checkTimestampValid(warpData.timestamp)){
          resolve(warpData);
        }else{
          this.fetchNetData(url).then((data)=>{
            console.log(data);
            resolve(this._wrapData(data));
          }).catch((error)=>{
            reject(error);
          })
        }
      }).catch((error) =>{
        this.fetchNetData(url).then((data) =>{
          resolve(this._wrapData(data));
        }).catch((error)=>{
          reject(error);
        })
      })
    })
  }
  /**
   * save Data
   * @param {*} url 
   * @param {*} data 
   * @param {*} callback 
   */
  saveData(url,data,callback){
    if(!data || !url ) return;
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)),callback)
  }

  _wrapData(data){
    return {data: data, timestamp: new Date().getTime()};
  }

  /**
   * fetch local data
   * @param {*} url 
   */
  fetchLocalData(url){
    return new Promise(( resolve, reject) =>{
      AsyncStorage.getItem(url,(error,result)=>{
        if(!error){
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e);
            console.error(e);
          }
        }else{
          reject(error);
          console.error(error);
        }
      })
    })
  }

  /**
   * fetch net data
   * @param {} url 
   */
  fetchNetData(url){
    return new Promise((resolve,reject) => {
      fetch(url).then((response)=>{
        console.log(url)
        if(response.ok){
          return response.json();
        }
        throw new Error('Network response was not ok.')
      }).then((responseData)=>{
        this.saveData(url,responseData);
        resolve(responseData);
      }).catch((error)=>{
        reject(error);
      })
    })
  }


  static checkTimestampValid(timestamp){
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if(currentDate.getMonth() !== targetDate.getMonth()) return false;
    if(currentDate.getDate() !== targetDate.getDate()) return false;
    if(currentDate.getHours() - targetDate.getHours() > 4) return true;
    //if(currentDate.getMinutes() !== targetDate.getMinutes()) return false;
    return true;
  }
}