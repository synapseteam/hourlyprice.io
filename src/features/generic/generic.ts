import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRates } from "features/rates";

type genericFields = {
  price: string;
  time: string | number;
  currency: string;
};

type genericState = {
  fields: genericFields;
  isLoading: boolean;
  ratesRequestErr: boolean;
  isInvoiceItemAdded: boolean;
  isInvoiceFull: boolean;
};

const initialState: genericState = {
  fields: {
    price: "",
    time: "",
    currency: "USD",
  },
  isLoading: false,
  ratesRequestErr: false,
  isInvoiceItemAdded: false,
  isInvoiceFull: false,
};

export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    modifyFields: (state, action: PayloadAction<genericFields>) => {
      state.fields = action.payload;
    },
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setRequestErr: (state, action: PayloadAction<boolean>) => {
      state.ratesRequestErr = action.payload;
    },
    clearFields: (state) => {
      state.fields = initialState.fields;
    },
    setInvoiceItemAdded: (state, action: PayloadAction<boolean>) => {
      state.isInvoiceItemAdded = action.payload;
    },
    setInvoiceFull: (state, action: PayloadAction<boolean>) => {
      state.isInvoiceFull = action.payload;
    },
  },
  extraReducers: {
    [fetchRates.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchRates.rejected.type]: (state) => {
      state.ratesRequestErr = true;
      state.isLoading = false;
    },
    [fetchRates.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  modifyFields,
  toggleIsLoading,
  setRequestErr,
  clearFields,
  setInvoiceItemAdded,
  setInvoiceFull,
} = genericSlice.actions;
