import React, {Component} from 'react';
// import store from '../store';
import actions from '../store/actions/counter1';
// import {bindActionCreators} from '../redux';

// let newActions = bindActionCreators(actions, store.dispatch);

import {connect} from '../react-redux';

class Counter1 extends Component {
  // state = {
  //   number: store.getState().counter1.number
  // };

  // componentDidMount() {
  //   //订阅，每次dispatch时触发
  //   store.subscribe(() => this.setState({number: store.getState().counter1.number}));
  // }

  render() {
    return (
      <div>
        <p>{this.props.number}</p>

        {/*<button onClick={()=>store.dispatch({type:types.ADD})}>+</button>*/}
        {/*<button onClick={() => store.dispatch(actions.add())}>+</button>*/}
        <button onClick={()=>this.props.add1(1)}>+</button>

        {/*<button onClick={()=>store.dispatch({type:types.MINUS})}>-</button>*/}
        {/*<button onClick={() => store.dispatch(actions.minus())}>-</button>*/}
        <button onClick={()=>this.props.minus1(1)}>-</button>
      </div>
    )
  }
}


//这个函数得到的就是newActions对象
//，So，除了像下面这样写，我们也可以直接把actions(不是newActions)作为connect的第二个参数传入
//，connect模块内部会用bindActionCreators帮我们包装actions成为下面这种类型
let mapDispatchToProps=(dispatch)=>({
  add1(){
    dispatch({type: 'ADD1', payload: 1});
  }
  ,minus1(){
    dispatch({type: 'MINUS1', payload: 1});
  }
});

//把仓库中的完整状态映射为属性对象
let mapStateToProps=(state)=>state.counter1;

// export default connect(mapStateToProps,mapDispatchToProps)(Counter1);
export default connect(mapStateToProps,actions)(Counter1);
