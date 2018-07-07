import reducers from './reducers';
import {createStore} from '../redux';

console.log('reducers:',reducers)
export default createStore(reducers);
