//2. 将创建出来的history 传入 react-router-redux 导出的 routerMiddleware 中间件
// const middleware = routerMiddleware(history);

function routerMiddleware(history){
  return function ({getState,dispatch}) {
    return function(next){
      return function (action){
        if(action.type === CHANGE_LOCATION){
          history.push(action.pathname);
        }else{
          next(action);
        }
      }
    }
  }
}
