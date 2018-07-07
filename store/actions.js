import * as types from './action-types';

export default {
  add(payload) {
    return {type:types.ADD,payload}
  }
  ,minus(payload) {
    return {type:types.MINUS,payload}
  }
}
