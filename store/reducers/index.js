import counter1 from './counter1';
import counter2 from './counter2';

import {combineReducers} from '../../redux';

/**
 * 这个方法可以把多个子reducer合并成一个reducer并导出
 *
 * key决定了在合并后的状态中的属性名
 *               ↓
 *  for(let key in reducers){
 *    newState[key] = reducers[key];
 *  }
 *
 */

export default combineReducers({
  counter1
  , counter2
});

/**
 * {
 *   counter2:{number:0}
 *   counter1:{number:0}
 * }
 */
