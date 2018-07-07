import * as types from '../action-types';

export default {
  add2(payload) {
    return {type:types.ADD2,payload}
  }
  ,minus2(payload) {
    return {type:types.MINUS2,payload}
  }
}
