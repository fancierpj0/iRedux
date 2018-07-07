export default function creteStore(reducer){
  //声明state
  let state

    , listeners = [];

  function getState(){
    ///返回一个一样但是全新的state给用户
    return JSON.parse(JSON.stringify(state));
  }

  /*
    === 改变state ===

    在组件中调用dispatch后
    ，dispatch会调用仓库初始化时所接受的reducer方法来改state
    ，最后会让所有listener执行一遍
  */

  function dispatch(action){
    state = reducer(state,action);
    listeners.forEach(l => l());
  }


  function subscribe(listener){
    listeners.push(listener);

    //订阅后返回一个unsubscribe取消订阅函数
    return function(){
      listeners = listeners.filter(l => l !== listener);
    }
  }


  //创建仓库时手动调用一次，让状态在各自模块对应的reducer中初始化
  dispatch({});

  return {
    getState
    ,dispatch
    ,subscribe
  }
}
