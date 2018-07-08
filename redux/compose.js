function add1(str){
  return 1 + str;
}

function add2(str){
  return 2 + str;
}

function add3(str){
  return 3 + str;
}

//TODO 如何让compose支持传进来的函数们可以接收两个以上的参数
function sum(a,b){}

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
// function compose(...fns){
//   return function(...args){
//     let last = fns.pop();
//     return fns.reduceRight((val, fn) => fn(val),last(...args));
//   }
// }

//---> 超·精简&装逼版
// let ret = add1(add2(sum('1','2')));
function compose(...fns){
  return fns.reduce((a, b) => (...args) => a(b(...args)));
  /**
   * 第一次的时候 a=add1,b=add2
   * =>
   * (...args) => add1(add2(...args))
   *
   * 第二次的时候 a = (...args) => add1(add2(...args))
   * ,b=sum
   * =>
   * (...args) => (x) => add1(add2(x))
   * 而此时x即为sum(...args)
   */
}

