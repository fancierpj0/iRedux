// export default function(actions,dispatch){
//   let newActions = {};
//
//   for(let key in actions){
//     newActions[key] = () => dispatch(actions[key]());
//   }
//
//   return newActions;
// }


export default function(actions,dispatch){

  //第一次，memo就是{}，key
  return Object.keys(actions).reduce((memo, key) => (memo[key] = (...args) => dispatch(actions[key](...args)),memo), {});

}
