import { combineReducers } from 'redux';

import UserDataReducer from './UserDataReducer';

const reducers = combineReducers({
  UserData: UserDataReducer,
});

export default reducers;
