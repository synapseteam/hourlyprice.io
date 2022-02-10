import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ratesDataAPI } from "api/api";
import { transformRatesResponse } from "utils/generic";

const initialState = {
  allCurrencies: [
    { name: "USD", rate: 1, symbol: "$" },
    { name: "EUR", rate: 1, symbol: "€" },
    { name: "UAH", rate: 1, symbol: "₴" },
    { name: "RUB", rate: 1, symbol: "₽" },
  ],
  updatedAt: "",
  ratesSource: "MasterCard",
};

export const fetchRates = createAsyncThunk("rates/fetchRates", async () => {
  const data = await ratesDataAPI.getRates();

  return data;
});

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setNewRates: (state, action) => {
      state.allCurrencies = action.payload.newRates;
      state.ratesSource = action.payload.ratesSource;
      state.updatedAt = String(new Date());
    },
    setManualRates: (state, action) => {
      state.allCurrencies = action.payload;
      state.ratesSource = "Manual";
    },
  },
  extraReducers: {
    [fetchRates.fulfilled]: (state, action) => {
      console.log("from rtk", action.payload);
    },
    [fetchRates.pending]: () => {},
  },
});
