import reducers from './reducers';
import {createStore, applyMiddleware} from '../redux';

import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../saga'
//执行它可以得到中间间函数
let sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(reducers);
//rootSaga是一个生成器
//开始执行生成器
//store会被传入rootSaga生成器中
//可以通过传递store，从而在saga中调用原生的派发
//，也可以不传，使用saga为我们提供的put方法进行派发
// sagaMiddleware.run(rootSaga,store);
sagaMiddleware.run(rootSaga);

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
function logger(store) { //为了拿到状态
  return function (next) { //next就是原本的dispatch，为了链式调用

    //狸猫换太子，返回一个新的dispatch方法
    return function (action) {
      console.log('老值:', store.getState());
      next(action);
      console.log('新值', store.getState());
    }
  }
}

//实现异步处理中间件 thunk
function thunk({dispatch, getState}) {
  return function (next) {

    //新dispatch
    return function (action) {
      //thunk就是专门用来处理action为函数的情况
      //如果发过来的是action是一个函数，则让它执行
      if (typeof action === 'function') {
        action(dispatch, getState);

        //如果不是一个函数，那么就不用处理，传递给下一个中间件(dispatch)
      } else {
        //这里，经过下面applyMiddleware的修改后，next不再能换成dispatch
        //，因为dispatch现在开始永远是最新的那个dispatch，而不再会存在为原本dispatch的情况
        //，而只有next会存在这种情况，next为上一次的dispatch
        next(action);
      }
    }
  }
}

function promise({dispatch, getState}) {
  return function (next) {
    return function (action) {
      if (action.then && typeof action.then === 'function') {
        action.then(dispatch);
      }
      else if (action.payload && action.payload.then && typeof action.payload.then === 'function') {
        //此时payload为promise
        action.payload.then(payload => {
          //此时payload为promise得到的值
          dispatch({...action, payload});
        }, payload => {
          dispatch({...action, payload});
        });
      }
      else {
        next(action);
      }
    }
  }
}


//实现中间件机制
// function applyMiddleware(..._middlewares){
//   return function(createStore){
//     return function (reducers) {
//
//       //此dispatch方法永远指向最新的dispatch方法
//       let dispatch
//
//         , middlewares
//
//         //这就是原始的仓库
//         , store = createStore(reducers);
//
//
//       //【1】
//       middlewares = _middlewares.map(_middleware => _middleware({
//         getState: store.getState
//         , dispatch: action => dispatch(action) //此时dispatch为undefined，但在下面,【2】时被赋值；不能就简单的写成dispatch，因为这样写相当于dispatch:undefined，下面给dispatch重新赋值时就修改不到
//       }));
//
//       // middleware = _middleware(store);
//       // middleware就等于
//       //    ↓
//       //  ==↓==
//       // return function(next){ //next就是下面【2】中的store.dispatch，也就是原本的dispatch
//       //
//       //   return function(action){
//       //
//       //   }
//       // }
//
//       //【2】
//       // dispatch = middleware(store.dispatch);
//       dispatch = compose(...middlewares)(store.dispatch);
//
//       //dispatch就等于
//       //    ↓
//       //  ==↓==
//       // 新的dispatch方法
//       // return function(action){
//       //
//       // }
//
//       //此时的dispatch将接收一个新的dispatch(高阶函数最外面那层接收的store里的dispatch)，和一个旧的dispatch(未经过本次包装前的dispatch)
//
//       //本例中，logger中间件的next为原始的store.dispatch
//       //thunk中间间的next为经过logger包装后的dispatch
//       // 即 ↓
//       // return (action){} 这一层
//       //promise中间件的next为经过thunk中间包装后的dispatch
//       //最终得到再次经过promise包装后的dispatch
//
//       return {
//         ...store
//         ,dispatch
//       }
//     };
//   }
// }

//用经过thunk包装后的dispatch替换原本store里的dispatch
//(...args)=>add1(add2(add3(...args)))
// let store = applyMiddleware(promise,thunk,logger)(createStore)(reducers);

//TODO 让createStore支持 中间件的初始化
//第二个参数为初始状态，我们一般不在这里进行初始哈，而是在各个子reducer处初始化
// let store = createStore(reducers, {}, applyMiddleware(promise, thunk, logger));

export default store;
