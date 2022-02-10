import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "store/reducers";

export const store = configureStore({
  reducer: rootReducer,
});

export * from "store/reducers";
export * from "store/actions";
