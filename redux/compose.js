// function add1(str){
//   return 1 + str;
// }
//
// function add2(str){
//   return 2 + str;
// }
//
// function add3(str){
//   return 3 + str;
// }

//TODO 如何让compose支持传进来的函数们可以接收两个以上的参数
// function sum(a,b){}

// let ret = add1(add2(add3('ahhh')));
// console.log(ret)

// function compose(...fns){
//   return function(args){
//     return fns.reduceRight((val, fn) => fn(val), args);
//   }
// }

// let ret = compose(add1, add2, add3)('ahhh');
// console.log(ret); //123ahhh
//--->

//可以接收任意参数
//dispatch = compose(...middlewares)(store.dispatch);
//middleware(【也就是下面compose接收的fn】)为 【next】=>action=>{}，没错store已破，在之前的map中被狸猫换太子掉了

// let logger = store => next => action => {
//   console.log('老值:', store.getState());
//   next(action);
//   console.log('新值', store.getState());
// }

// function compose(...fns){
//   return function(...args){ //这里的...args是剩余运算 [store.dispatch]
//     let last = fns.pop();
//     return fns.reduceRight((val, fn) => fn(va  l),last(...args)); //这里的...args是展开运算，是将[store.dispatch]展开 -> store.dispatch
//   }
// }
//最后返回的是fn1,fn1的next接收的是fn2，fn2的next接收的是fn3

//---> 超·精简&装逼版
// let ret = compose(add1, add2, add3)('ahhh');
function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)));
  /**
   * 第一次的时候 a=add1,b=add2
   * 则reduce第一次运行结果为=>
   * (...args) => add1(add2(...args))
   *
   * 第二次的时候 a = (...args) => add1(add2(...args))
   * 设这个a，即 (...args) => add1(add2(...args)) 为 fn
   * 那么第二次结果为 (...args) => fn(b(...args))
   * 可以看出，fn接收的结果为b(...args)
   * 即 【b(...args)】 为 (【...args】) => add1(add2(...args)) ,fn 所接受的参数
   * 这个参数会被包进args数组里，然后在 add1(add2(...args)) 中被展开
   *
   * 最后reducer的结果就变成了
   * (...args) => add1(add2(add3(【...args】)))
   * ，这里的...args 是展开运算，展开的是(【...args】) => add1(add2(add3(...args))) 的args，这个args就是[store.dispatch]，最终被展开传给add3执行时当做实参
   *
   * dispatch = compose(...middlewares)(store.dispatch);
   * =>mdw1(mdw2(mdw3(store.dispatch)))
   */
}

// let ret = compose(add1, add2, sum)('a', 'b');
// console.log(ret);

export default compose;

