// rootReducer.js

import {combineReducers} from 'redux';
import userReducer from './userReducer';
// 다른 리듀서들을 import

const rootReducer = combineReducers({
  user: userReducer,
  // 다른 리듀서들 추가
});

export default rootReducer;
