//TODO 54:00

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


//在redux中，一个自定义中间件是这样定义的
function logger(store){ //为了拿到状态
  return function(next){ //next就是原本的dispatch，为了链式调用

    //狸猫换太子，返回一个新的dispatch方法
    return function(action){
      console.log('老值:', store.getState());
      next(action);
      console.log('新值', store.getState());
    }
  }
}

//实现异步处理中间件 thunk
function thunk({dispatch,getState}){
  return function(next){

    //新dispatch
    return function(action){
      //thunk就是专门用来处理action为函数的情况
      //如果发过来的是action是一个函数，则让它执行
      if(typeof action === 'function'){
        action(dispatch,getState);

      //如果不是一个函数，那么就不用处理，传递给下一个中间件(dispatch)
      }else{
        //这里，经过下面applyMiddleware的修改后，next不再能换成dispatch
        //，因为dispatch现在开始永远是最新的那个dispatch，而不再会存在为原本dispatch的情况
        //，而只有next会存在这种情况，next为上一次的dispatch
        next(action);
      }
    }
  }
}

//实现中间件机制
function applyMiddleware(_middleware){
  return function(createStore){
    return function (reducers) {
      let middleware

        //此dispatch方法永远指向最新的dispatch方法
        , dispatch

        //这就是原始的仓库
        , store = createStore(reducers);

      //【1】
      middleware = _middleware({
        getState: store.getState
        , dispatch: action => dispatch(action) //此时dispatch为undefined，但在下面,【2】时被赋值
      });

      // middleware = _middleware(store);
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

      //此时的dispatch将接收一个新的dispatch(高阶函数最外面那层接收的store里的dispatch)，和一个旧的dispatch(未经过本次包装前的dispatch)

      return {
        ...store
        ,dispatch
      }
    };
  }
}

//用经过thunk包装后的dispatch替换原本store里的dispatch
let store = applyMiddleware(thunk)(createStore)(reducers);

export default store;
