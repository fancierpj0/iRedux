import * as types from '../action-types';

export default {
  add1(payload) {
    return {type:types.ADD1,payload}
  }
  ,minus1(payload) {
    return {type:types.MINUS1,payload}
  }
  ,thunk1(payload){
    //此时派发的是一个函数
    //this.store.dispatch(func)

    /**
     * 把这个函数法给仓库时
     * 1. 需要帮执行这个函数
     * 2. 需要传递进来dispatch和getState
     */
    return function(dispatch,getState){
      setTimeout(() => {
        // return {type:types.MINUS1,payload}
        dispatch({type: types.MINUS1, payload});
      },2000);
    }
  }

  ,promise1(payload){
    return new Promise(function (resolve,reject) {
      setTimeout(() => {
        resolve({type:types.ADD1,payload})
      },1000);
    });
  }

  ,payloadPromise1(payload){
    return {
      type: types.ADD1
      , payload: new Promise(function (resolve, reject) {
        setTimeout(() => {
          if(Math.random()>.5){
            resolve(payload);
          }else{
            reject(-payload);
          }
        }, 1000);
      })
    };
  }

}
