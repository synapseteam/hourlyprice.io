import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import mainReducer from "store/mainReducer";
import currenciesReducer from "store/currenciesReducer";

const rootReducer = combineReducers({
  main: mainReducer,
  rates: currenciesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
