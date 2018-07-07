export default function creteStore(reducer){
  // 声明state状态树
  // state里的节点可以是任意类型
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
    //调用reducer进行处理，获取老的state，计算出新的state
    state = reducer(state,action);
    //通知监听函数执行
    listeners.forEach(l => l());
  }

  //组件可以订阅仓库的变化
  //TODO 注意只要订阅，那么不管是什么状态变化，listener都会执行，而不是属于某个组件的sate变化才执行那个组件订阅的listener
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
