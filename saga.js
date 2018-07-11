import {take, put,takeEvery,call} from './redux-saga/effects';
import * as types from './store/action-types';

function* add(){
  yield call(delay,1000);
  yield put({type: types.ADD});
}

const delay = ms => new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve();
  }, ms);
});

export function* rootSaga(){
  //表示等待一个动作发生，take监听的只会执行一次，即使动作再被重新派发，只要没有重新take都不会再监听
  //只有当take监听的触发了，生成器才会继续往下走

  // let action = yield take(types.ADD_ASYNC);
  // yield put({type: types.ADD});

  //可点五次，有多少个take就可点几次，因为调用take会创造监听器，并且是一次性的
  // for(let i=0;i<5;++i){
  //   let action = yield take(types.ADD_ASYNC);
  //   yield put({type: types.ADD});
  // }

  //如果是takerEvery,takeEvery内部会递归调用两次【run】
  yield  takeEvery(types.ADD_ASYNC, add);

  //产出的是一个iterator，因为takerEvery是一个生成器
  //  ↓
  // function* takeEvery(actionType, worker) {
  //   yield  fork(function* () {
  //     while (true) {
  //       let action = yield take(actionType);
  //       yield worker(action);
  //     }
  //   });
  // }

  console.log('after TakerEvery,并不会阻塞往下运行');
}
