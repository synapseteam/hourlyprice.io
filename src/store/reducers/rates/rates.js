import { SET_NEW_RATES, SET_MANUAL_RATES } from "store/actions/rates";

const initialState = {
  allCurrencies: [
    { name: "USD", rate: 1, symbol: "$", isoCode: "840" },
    { name: "EUR", rate: 1, symbol: "€", isoCode: "978" },
    { name: "UAH", rate: 1, symbol: "₴", isoCode: "980" },
    { name: "RUB", rate: 1, symbol: "₽", isoCode: "810" },
  ],
  updatedAt: "",
  ratesSource: "MasterCard",
};

export function ratesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_RATES:
      return {
        ...state,
        allCurrencies: state.allCurrencies.map((el) => ({
          ...el,
          rate: el.name === "USD" ? 1 : action.payload[el.name],
        })),
        ratesSource: action.payload.ratesSource,
        updatedAt: new Date(),
      };
    case SET_MANUAL_RATES:
      return {
        ...state,
        allCurrencies: state.allCurrencies.map((el) => ({
          ...el,
          rate: action.payload[el.name],
        })),
        ratesSource: "Manual",
      };
    default:
      return state;
  }
}
