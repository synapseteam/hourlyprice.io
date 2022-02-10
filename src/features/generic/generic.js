import { createSlice } from "@reduxjs/toolkit";

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
});

export const { modifyFields, toggleIsLoading, setRequestErr, clearFields } =
  genericSlice.actions;
