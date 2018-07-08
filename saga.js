//从effects解构出来的这些都是副作用指令
import {takeEvery,put,all} from 'redux-saga/effects';
import * as types from './store/action-types';

function* add(dispatch,action){
  // setTimeout(function () {
  //   console.log('dispatch')
  //   dispatch({type: types.ADD});
  // }, 2000);

  yield put({type: types.ADD});
}

//action在监听到的时就会自动传入
//，并且作为最后一个参数传入
function* logger(action){
  console.log(action);
}

//saga分为三类:
//1. rootSaga
//2. 监听saga
//3. worker-saga
function* watchLogger(){
  //监听任意动作
  yield takeEvery('*',logger);
}

function* watchAdd(){
  yield takeEvery(types.ADD_ASYNC,add);
}

//sagaMiddleware.run(rootSaga,store);
// export function* rootSaga({getState,dispatch}) {
//   console.log('rootSaga:saga start');
//
//   //监听派发给仓库的动作,如果动作类型匹配的话，会执行对应的监听生成器
//   //,类似于订阅发布
//   //,返回一个普通对象，被称之为Effect对象
//   //ADD_ASYNC在reducer中并不存在
//   //add后面的参数都会传递给add生成器
//   //types.ADD_ASYNC 无法携带payload
//   yield takeEvery(types.ADD_ASYNC,add,dispatch)
// }

//不传递store进来时
export function* rootSaga() {
  console.log('rootSaga:saga start');

  //监听派发给仓库的动作,如果动作类型匹配的话，会执行对应的监听生成器
  //,类似于订阅发布
  //,返回一个普通对象，被称之为Effect对象
  //ADD_ASYNC在reducer中并不存在
  //add后面的参数都会传递给add生成器
  //types.ADD_ASYNC 无法携带payload
  // yield takeEvery(types.ADD_ASYNC,add);

  yield all([watchAdd(), watchLogger()]); //类似于promise.all
}
