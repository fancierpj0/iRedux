import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import {Route,Link} from 'react-router-dom';

//TODO
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';

// import reducers from './reducers';

//1. 创建一个browserHistory
const history = createHistory();

//2. 将创建出来的history 传入 react-router-redux 导出的 routerMiddleware 中间件
const middleware = routerMiddleware(history);

//3. combineReducers时添加一个 react-router-redux 导出的 routerReducer
const store = createStore(
  combineReducers({
    // ...reducers
    // , router: routerReducer
    router: routerReducer
  })
  , applyMiddleware(middleware)
);


let Home = () => <div>Home</div>;
let About = () => <div>About</div>;
let Topics = () => <div>Topics</div>;

window.store = store;
window.push = push;
ReactDOM.render(
  <Provider store={store}>
    {/* 4. 用 react-router-redux 导出的 ConnectedRouter 替换 Router */}
    <ConnectedRouter history={history}>
      <div>
        <Link to='/about'>about</Link>
        <Link to='topics'>topics</Link>
        <Route exact path='/' component={Home}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/topics' component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>
  , window.root);
