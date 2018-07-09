
function createSagaMiddleware() {
  //sagaMiddleware只会执行一次，故无需担心run、createChannel函数被多次创建
  function sagaMiddleware({getState, dispatch}) {

    function createChannel() {
      //taker用一次就销毁
      //每一个动作对应一个回调函数
      let takers = {};

      function subscribe(actionType, cb) {
        takers[actionType] = cb;
      }

      function publish(action) { //{type:ADD}
        let taker = takers[action.type];
        if (taker) { //如果有执行监听函数并且删除监听函数
          let tmp = taker;
          delete takers[action.type];
          tmp(action);
        }
      }

      return {subscribe, publish}
    }

    let channel = createChannel();

    //run要负责把generator执行完毕
    //放在里面是为了拿到dispatch
    function run(generator) {
      let it = typeof generator === 'function' ? generator()
        // 说明已经是一个迭代器
        : generator;

      function next(input) {
        // let action = yield take(types.ADD_ASYNC)
        // take返回一个对象
        // ↓也就等于
        // -> yield {type:'take',actionType:ADD_ASYNC}
        // -> 也就是说最终yield的是一个对象，它会作为it.next()后返回的{value,done}中的value
        let {value: effect, done} = it.next(input);//input会作为本次迭代的输入
        if (!done) { //还没有迭代完
          if (typeof effect[Symbol.iterator] === 'function') { //如果是一个迭代器
            run(effect); //run(iterator)

            //  ↓
            // function* takeEvery(actionType, worker) {
            //   yield  fork(function* () {
            //     while (true) {
            //       let action = yield take(actionType);
            //       yield worker(action);
            //     }
            //   });
            // }
            // function fork(worker) {
            //   return {
            //     type: 'fork'
            //     , worker
            //   }
            // }

            // ->run产出，即fork函数的运行结果：
            // {
            //   type: 'fork'
            //   , worker
            // }

            next();//不会阻塞

          //是一个effect对象
          } else {
            switch (effect.type) {

              //take是要等待一个动作发生，相当于注册一个监听
              case 'take':
                let {actionType} = effect;
                channel.subscribe(actionType, next);
                break;

              case 'put':
                let {action} = effect;
                dispatch(action);
                next(action);
                break;

              case 'fork':
                let {worker} = effect;
                run(worker);
                next();
                break;

              case 'call':
                let {fn,args} = effect;
                fn(...args).then(next);

                // const delay = ms => new Promise(function (resolve, reject) {
                //   setTimeout(function () {
                //     resolve();
                //   }, ms);
                // });

                //返回一个promise

                break;

              default:
                break;
            }
          }
        }


      }

      next();
    }

    sagaMiddleware.run = run;

    return function (next) {
      return function (action) {
        //taker,即listener，用一次就销毁
        //而生成器rootSaga只会执行一次
        channel.publish(action);
        next(action);
      }
    }

  }

  return sagaMiddleware;
}

export default createSagaMiddleware;
