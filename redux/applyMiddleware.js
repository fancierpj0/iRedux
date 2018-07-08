//实现中间件机制
import compose from "./compose";

function applyMiddleware(..._middlewares){
  return function(createStore){
    return function (reducers) {

      //此dispatch方法永远指向最新的dispatch方法
      let dispatch

        , middlewares

        //这就是原始的仓库
        , store = createStore(reducers);


      //【1】
      middlewares = _middlewares.map(_middleware => _middleware({
        getState: store.getState
        , dispatch: action => dispatch(action) //此时dispatch为undefined，但在下面,【2】时被赋值；不能就简单的写成dispatch，因为这样写相当于dispatch:undefined，下面给dispatch重新赋值时就修改不到
      }));

      // middleware = _middleware(store);
      // middleware就等于
      //    ↓
      //  ==↓==
      // return function(next){ //next就是下面【2】中的store.dispatch，也就是原本的dispatch
      //
      //   return function(action){
      //
      //   }
      // }

      //【2】
      // dispatch = middleware(store.dispatch);
      dispatch = compose(...middlewares)(store.dispatch);

      //dispatch就等于
      //    ↓
      //  ==↓==
      // 新的dispatch方法
      // return function(action){
      //
      // }

      //此时的dispatch将接收一个新的dispatch(高阶函数最外面那层接收的store里的dispatch)，和一个旧的dispatch(未经过本次包装前的dispatch)

      //本例中，logger中间件的next为原始的store.dispatch
      //thunk中间间的next为经过logger包装后的dispatch
      // 即 ↓
      // return (action){} 这一层
      //promise中间件的next为经过thunk中间包装后的dispatch
      //最终得到再次经过promise包装后的dispatch

      return {
        ...store
        ,dispatch
      }
    };
  }
}

export default applyMiddleware;
