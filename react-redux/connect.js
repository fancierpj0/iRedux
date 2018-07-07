import React from 'react';
import {Consumer} from './context';
import {bindActionCreators} from '../redux';

/**
 * connect实现的是仓库和组件的连接
 * mapStateToProps 是一个函数 把状态映射为一个属性对象
 * mapStateToProps 也是一个函数 把dispatch方法映射为一个属性对象
 */

export default function (mapStateToProps, mapDispatchToProps) {
  //connect(mapStateToProps,actions)
  return function (Component) {

    //在这个代理组件里实现仓库和组件的链接
    class Proxy extends React.Component {
      //mapStateToProps=(state)=>state.counter1;
      state = mapStateToProps(this.props.store.getState());

      componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
          this.setState(mapStateToProps(this.props.store.getState()))
        });
      }

      componentWillUnmount = () => {
        this.unsubscribe();
      };

      render() {
        let actions = {};
        if (typeof mapDispatchToProps === 'function') {
          // =>这种情况

          // let mapDispatchToProps=(dispatch)=>({
          //   add1(){
          //     dispatch({type:'ADD1',payload:1})
          //   }
          //   ,minus1(){
          //     dispatch({type:'MINUS1',payload:1})
          //   }
          // });

          actions = mapDispatchToProps(this.props.store.dispatch);
        } else {
          actions = bindActionCreators(mapDispatchToProps, this.props.store.dispatch);
        }

        return <Component {...this.state} {...actions}/>;
      }
    }

    //connect(mapStateToProps,actions)(Counter1)
    //返回一个函数组件
    return () => (
      <Consumer>
        {
          value => <Proxy store={value.store}/>
        }
      </Consumer>
    );

  }
};
