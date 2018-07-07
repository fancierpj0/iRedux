import * as types from '../action-types';

let initState = {number:0};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case types.ADD1:
      return {number: state.counter1.number + action.payload};
    case types.MINUS1:
      return {number: state.counter1.number - action.payload};
    default:
      return state;
  }
}
