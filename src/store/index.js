import { configureStore } from "@reduxjs/toolkit";

import { genericSlice } from "features/generic";
import { ratesSlice } from "features/rates";

export const store = configureStore({
  reducer: {
    generic: genericSlice.reducer,
    rates: ratesSlice.reducer,
  },
});
