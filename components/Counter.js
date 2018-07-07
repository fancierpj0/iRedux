import React, {Component} from 'react';
import store from '../store';
import actions from '../store/actions';
import {bindActionCreators} from '../redux';

//TODO action creator
// function add(){
//   return {type: types.ADD};
// }

//TODO 免得每次都调用store.dispatch
let newActions = bindActionCreators(actions, store.dispatch);

export default class Counter extends Component {
  state = {
    number: store.getState().number
  };

  componentDidMount() {
    //订阅，每次dispatch时触发
    store.subscribe(() => this.setState({number: store.getState().number}));
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>

        {/*<button onClick={()=>store.dispatch({type:types.ADD})}>+</button>*/}
        {/*<button onClick={() => store.dispatch(actions.add())}>+</button>*/}
        <button onClick={()=>newActions.add(1)}>+</button>

        {/*<button onClick={()=>store.dispatch({type:types.MINUS})}>-</button>*/}
        {/*<button onClick={() => store.dispatch(actions.minus())}>-</button>*/}
        <button onClick={()=>newActions.minus(2)}>-</button>
      </div>
    )
  }
}
