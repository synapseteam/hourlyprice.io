import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ratesDataAPI } from "api/api";
import { transformRatesResponse } from "utils/generic";
import { ICurrency } from "typescript/interfaces";

type Rates = {
  allCurrencies: ICurrency[];
  updatedAt: string;
  ratesSource: string;
  newRates?: any;
};

const initialState: Rates = {
  allCurrencies: [
    { name: "USD", rate: 1, symbol: "$" },
    { name: "EUR", rate: 1, symbol: "€" },
    { name: "UAH", rate: 1, symbol: "₴" },
  ],
  updatedAt: "",
  ratesSource: "masterCard",
};

export const fetchRates = createAsyncThunk<Rates>(
  "rates/fetchRates",
  async () => {
    const data = await ratesDataAPI.getRates();
    return data;
  }
);
export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setNewRates: (state, action: PayloadAction<Rates>) => {
      state.allCurrencies = action.payload.newRates;
      state.ratesSource = action.payload.ratesSource;
      state.updatedAt = String(new Date());
    },
    setManualRates: (state, action: PayloadAction<ICurrency[]>) => {
      state.allCurrencies = action.payload;
      state.ratesSource = "manual";
    },
  },
  extraReducers: {
    [fetchRates.fulfilled.type]: (
      state,
      action: PayloadAction<ICurrency[]>
    ) => {
      const newPayload = [
        ...transformRatesResponse(action.payload),
        { name: "USD", rate: 1, symbol: "$" },
      ];
      state.allCurrencies = newPayload;
      state.updatedAt = String(new Date());
    },
  },
});

export const { setNewRates, setManualRates } = ratesSlice.actions;
