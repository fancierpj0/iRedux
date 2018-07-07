import * as types from '../action-types';

export default {
  add1(payload) {
    return {type:types.ADD1,payload}
  }
  ,minus1(payload) {
    return {type:types.MINUS1,payload}
  }
}
