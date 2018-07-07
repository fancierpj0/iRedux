## Redux三大原则

- 整个应用的 state 被存储在一颗 object tree 中，并且这个object tree 只存在于唯一一个store中

- State 是只读的， 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象，使用【纯函数】来执行修改，为了描述action如何改变state tree，你需要编写reducers

  纯函数:不会修改输入的参数，输入的参数一定，输出的值也是一定的，不能有异步代码

  state之所以是只读的，在于它存放在store(函数里)的闭包里

- 单一数据源的设计让React的组件之间的通信更加方便，同时也便于状态的统一管理(你凶大你说了算)

## 各个模块的作用
->createStore.js (形成闭包，保护state)

->action-types.js (一个对象囊括N个常量，用于Reducer switch-case)

->actions.js (一个对象囊括N个action-creator，即创造常量的方法，比上一个好在于可携带自定义payload)

->bindActionCreators.js (省去store.dispatch(actions.xx)的store.dispatch()，可直接在组件中给事件绑定actions.xx 作为监听函数)

//TODO 此时虽然让不同的组件都可以拿到仓库里自己要的那部分数据了，但所有派发都是发给同一个reducer来处理的，这样当组件量多起来时，想要维护这个reducer就很难了，So，我们期望一个组件对应一个子reducer，这个子reducer只用来处理本组件的动作和state

//但又由于redux应用的原则是，只能有一个state(reducer)
//So分开写后最终还是要把多个reducer合成一个

-> combineReducers.js (注意：每个reducer中只包含自己那份的state，即仓库的state的一部分)

//TODO 此时不同组件依然存在大量重复代码，比如每个组件都要引入store,并且从store中取出自己要的数据，并将其置为自己的state，再比如都要订阅store，派发动作时必须要加`this.$store.dispatch`前缀

-> react-redux/

//TODO 中间件与异步处理

