let initRouterState = {location: {}};
function routerReducer(state=initRouterState,action) {
  switch (action.type){
    case 'LOCATION_CHANGE':

      //由ConnectedRouter派发
      // ↓
      //hashchange或则popstate会调用这里注册的回调
      // this.props.history.listen(location=>{
      //   type:'LOCATION_CHANGE'
      //     ,location
      // })

      return {...state, location: action.location};
    default:
      return state;
  }
}
