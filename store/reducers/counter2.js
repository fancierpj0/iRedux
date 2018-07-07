import * as types from '../action-types';

let initState = {number:0};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case types.ADD2:
      // console.log('state:',state)
      return {number: state.number + action.payload};
    case types.MINUS2:
      return {number: state.number - action.payload};
    default:
      return state;
  }
}
