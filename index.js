import React from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './components/Counter1';
import Counter2 from './components/Counter2';

ReactDOM.render(<React.Fragment>
  <Counter1></Counter1>
  <Counter2></Counter2>
</React.Fragment>, document.getElementById('root'));
