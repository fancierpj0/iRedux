##

action-types.js (一个对象囊括N个常量)

->actions.js (一个对象囊括N个action-creator，即创造常量的方法，比上一个好在于可携带自定义payload)

->bindActionCreators.js (省去store.dispatch(actions.xx)的store.dispatch()，可直接在组件中给事件绑定actions.xx 作为监听函数)
