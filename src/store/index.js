import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import mainReducer from "./mainReducer";
import currenciesReducer from "./currenciesReducer";

const rootReducer = combineReducers({
  main: mainReducer,
  rates: currenciesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
