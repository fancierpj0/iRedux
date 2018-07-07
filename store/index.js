import reducers from './reducers';
import {createStore} from '../redux';

let store = createStore(reducers);

//缓存本来的dispatch方法
let dispatch = store.dispatch;

store.dispatch = function (action) {
  console.log('老的状态:', store.getState());
  dispatch(action);
  console.log('新的状态:', store.getState());
};

export default store;
