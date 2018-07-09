//这里所有的函数都会返回一个effect
//，而effect就是一个普通对象
//, 其中effect对象都有一个type属性

function take(actionType) {
  // let action = yield take(types.ADD_ASYNC)
  // take返回一个对象
  // ↓也就等于
  // -> yield {type:'take',actionType:ADD_ASYNC}
  // -> 也就是说最终yield的是一个对象，它会作为it.next()后返回的{value,done}中的value
  return {
    type: 'take'
    , actionType
  }
}

function fork(worker) {
  return {
    type: 'fork'
    , worker
  }
}

//监听每一个动作类型，当此动作发生的时候，执行对应的worker
//takerEvery 它会单开一个任务，并不会阻塞当前saga
function* takeEvery(actionType, worker) {
  yield  fork(function* () {
    while (true) {
      let action = yield take(actionType);
      yield worker(action);
    }
  });
}

function put(action) {
  return {
    type: 'put'
    , action
  }
}

function call(fn, ...args) {
  return {
    type: 'call'
    , fn
    , args
  }
}

export {
  take
  , put
  , takeEvery
  , call
};
