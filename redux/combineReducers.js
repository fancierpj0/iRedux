export default function(reducers){

  //返回的这个函数就是合并后的reducer

  //dispatch时被调用，会传入仓库中的state树和派发的动作

  //注意给state一个`{}`作为初始值，不然调用子reducer时传参会出错
  return function (state={},action) {
    let newState = {};

    //各 子reducer 算完后被封装进一同一个对象里 返回
    //TODO 源码就是像下面这样，一个action会在所有子reducer中全部跑一遍，若只想当派发的动作在它应该在的那个reducer中进行匹配和处理，可以在传递动作时，设置一个name，如果name和key相等时才会进入该子reducer；但这样组件依然会重新渲染，因为dispatch后所有listener都会执行一遍，So还要在那里修改
    for(let key in reducers){

      //newState['count1'] = reducers['count1'](state['count1]'],action)

      newState[key] = reducers[key](state[key],action);
    }

    return newState;
  };
}
