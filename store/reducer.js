import * as types from './action-types';

let initState = {
  counter1:{number:0}
  ,counter2:{number:0}
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case types.ADD1:
      return {...state,counter1:{number: state.counter1.number + action.payload}};
    case types.MINUS1:
      return {...state,counter1:{number: state.counter1.number - action.payload}};
    case types.ADD2:
      return {...state,counter2:{number: state.counter2.number + action.payload}};
    case types.MINUS2:
      return {...state,counter2:{number: state.counter2.number - action.payload}};
    default:
      return state;
  }
}
