import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { mainReducer } from "store/reducers/generic";
import { ratesReducer } from "store/reducers/rates";

const rootReducer = combineReducers({
  main: mainReducer,
  rates: ratesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
