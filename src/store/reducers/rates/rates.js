import { SET_NEW_RATES, SET_MANUAL_RATES } from "store/actions/rates";

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

export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_RATES:
      return {
        allCurrencies: action.payload.newRates,
        ratesSource: action.payload.ratesSource,
        updatedAt: String(new Date()),
      };
    case SET_MANUAL_RATES:
      return {
        ...state,
        allCurrencies: action.payload,
        ratesSource: "Manual",
      };
    default:
      return state;
  }
}
