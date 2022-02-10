import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "store/reducers";
import { genericSlice } from "features/generic";
import { ratesSlice } from "features/rates";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    generic: genericSlice.reducer,
    rates: ratesSlice.reducer,
  },
});

export * from "store/reducers";
export * from "store/actions";
