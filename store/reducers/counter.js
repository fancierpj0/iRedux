import * as types from '../action-types';

let initState = {number:0};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case types.ADD:
      // console.log('action:',action)
      return {number: state.number + 1};
    case types.MINUS:
      return {number: state.number - 1};
    default:
      return state;
  }
}
