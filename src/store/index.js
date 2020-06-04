import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

//logger
const logger = store=>next=>action=>{
  if(typeof action === 'function'){
    console.log("dispathing a action")
  }else{
    console.log("dispathing",action)
  }
  const result = next(action)
  console.log('nextState',store.getState());
  return result;
}

const middlewares = [ 
  logger,
  thunk,
];

//create store
export default createStore(reducers,applyMiddleware(...middlewares));
