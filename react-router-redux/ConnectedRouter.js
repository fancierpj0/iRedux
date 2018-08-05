import React from 'react';
import {Router} from 'react-router-dom';
import PropTypes from 'prop-types';

//每当路径发生变化的时候就会改变仓库中的location

{/* 4. 用 react-router-redux 导出的 ConnectedRouter 替换 Router */}
{/*<ConnectedRouter history={history}>*/}

export default class ConnectedRouter extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  //链接仓库和路由，监听路由变化，当路径发生变化的时候派发动作
  componentWillUnMount() {
    this.store = this.context.store;

    //hashchange或则popstate会调用这里注册的回调
    //重写监听，原本listener ()=>setState({}) 会被下面的顶替
    this.props.history.listen(location=>{
      type:'LOCATION_CHANGE'
      ,location
    })
  }

  render() {
    return (
      <Router {...this.props}/>
    )
  }
}
