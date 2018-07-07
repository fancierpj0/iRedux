import reducers from './reducers';
import {createStore} from '../redux';

// let store = createStore(reducers);

//TODO 中间件，原理就是重写dispatch方法

//缓存本来的dispatch方法
// let dispatch = store.dispatch;
//
// store.dispatch = function (action) {
//   console.log('老的状态:', store.getState());
//   dispatch(action);
//   console.log('新的状态:', store.getState());
// };


//定义一个redux中间件
function logger(store){ //为了拿到状态
  return function(next){ //next就是原本的dispatch，为了链式调用

    //狸猫换太子，新的dispatch方法
    return function(action){
      console.log('老值:', store.getState());
      next(action);
      console.log('新值', store.getState());
    }
  }
}

//使用中间件
function applyMiddleware(_middleware){
  return function(createStore){
    return function (reducers) {
      let middleware
        , dispatch
        //这就是原始的仓库
        , store = createStore(reducers);

      //【1】
      middleware = _middleware(store);
      // middleware就等于
      //  ↓
      // return function(next){ //next就是下面【2】中的store.dispatch，也就是原本的dispatch
      //
      //   return function(action){
      //
      //   }
      // }

      //【2】
      dispatch = middleware(store.dispatch);
      //dispatch就等于
      //  ↓
      // 新的dispatch方法
      // return function(action){
      //
      // }

      return {
        ...store
        ,dispatch
      }
    };
  }
}

let store = applyMiddleware(logger)(createStore)(reducers);

export default store;
