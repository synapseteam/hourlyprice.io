import { configureStore } from "@reduxjs/toolkit";

import { genericSlice } from "features/generic";
import { ratesSlice } from "features/rates";
import { authSlice } from "features/auth";

export const store = configureStore({
  reducer: {
    generic: genericSlice.reducer,
    rates: ratesSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispacth = typeof store.dispatch;
