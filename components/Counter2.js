import React, {Component} from 'react';
// import store from '../store';
import actions from '../store/actions/counter2';
// import {bindActionCreators} from '../redux';

// let newActions = bindActionCreators(actions, store.dispatch);

import {connect} from '../react-redux';

class Counter2 extends Component {
  // state = {
  //   number: store.getState().counter2.number
  // };

  // componentDidMount() {
  //   //订阅，每次dispatch时触发
  //   store.subscribe(() => this.setState({number: store.getState().number}));
  // }

  render() {
    return (
      <div>
        <p>{this.props.number}</p>

        {/*<button onClick={()=>store.dispatch({type:types.ADD})}>+</button>*/}
        {/*<button onClick={() => store.dispatch(actions.add())}>+</button>*/}
        <button onClick={() => this.props.add2(2)}>+</button>

        {/*<button onClick={()=>store.dispatch({type:types.MINUS})}>-</button>*/}
        {/*<button onClick={() => store.dispatch(actions.minus())}>-</button>*/}
        <button onClick={() => this.props.minus2(2)}>-</button>
      </div>
    )
  }
}

export default connect((state) => state.counter2, actions)(Counter2);
