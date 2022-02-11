import { createSlice } from "@reduxjs/toolkit";
import { fetchRates } from "features/rates";

const initialState = {
  fields: {
    price: "",
    time: "",
    currency: "USD",
  },
  isLoading: false,
  ratesRequestErr: false,
};

export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    modifyFields: (state, action) => {
      state.fields = action.payload;
    },
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setRequestErr: (state, action) => {
      state.ratesRequestErr = action.payload;
    },
    clearFields: (state) => {
      state.fields = initialState.fields;
    },
  },
  extraReducers: {
    [fetchRates.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchRates.rejected]: (state) => {
      state.ratesRequestErr = true;
      state.isLoading = false;
    },
    [fetchRates.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { modifyFields, toggleIsLoading, setRequestErr, clearFields } =
  genericSlice.actions;
