const CHANGE_LOCATION = 'CHANGE_LOCATION';

function push(pathname){
  return {
    type: CHANGE_LOCATION
    , pathname
  };
}
