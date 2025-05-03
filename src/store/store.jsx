import { configureStore, combineReducers } from '@reduxjs/toolkit'
import products from './products';
import {createLogger} from 'redux-logger';
import thunk from "redux-thunk";

const rootReducer = combineReducers({products});
// const middleware = composeWithDevTools(
//   (createLogger({collapsed: true}))
// );

const store = configureStore({
  reducer: rootReducer,
  })
  export default store

  export * from './products';