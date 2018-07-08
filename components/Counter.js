import React from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions/counter';

class Counter extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.add}>+</button>
      </div>
    )
  }
}

//{number:0}
export default connect(
  state => state.counter
  , actions
)(Counter)
