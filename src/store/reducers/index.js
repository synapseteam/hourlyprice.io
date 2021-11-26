import { combineReducers } from "redux";

import { mainReducer } from "store/reducers/generic";
import { ratesReducer } from "store/reducers/rates";

export const rootReducer = combineReducers({
  main: mainReducer,
  rates: ratesReducer,
});
