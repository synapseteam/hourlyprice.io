import { ratesDataAPI } from "../api/api";
import { toggleLoadingStatus, setRequestErr } from "./mainReducer";

export const SET_NEW_RATES = "SET_NEW_RATES";

const initStateForRates = {
  allCurrencies: [
    { name: "USD", rate: 1, symbol: "$", isoCode: "840" },
    { name: "EUR", rate: 1, symbol: "€", isoCode: "978" },
    { name: "UAH", rate: 1, symbol: "₴", isoCode: "980" },
    { name: "RUB", rate: 1, symbol: "₽", isoCode: "810" },
  ],
  updatedAt: "",
};

export default function currenciesReducer(state = initStateForRates, action) {
  switch (action.type) {
    case SET_NEW_RATES:
      return {
        ...state,
        allCurrencies: state.allCurrencies.map((el) => ({
          ...el,
          rate: el.name === "USD" ? 1 : action.payload[el.name],
        })),
        updatedAt: new Date(),
      };
    default:
      return state;
  }
}

export const setNewRates = (newRates) => {
  return { type: SET_NEW_RATES, payload: newRates };
};

export const getNewRatesThunkCreator = () => {
  return (dispatch) => {
    dispatch(toggleLoadingStatus());
    ratesDataAPI
      .getRates()
      .then((newRatesObj) => {
        dispatch(setNewRates(newRatesObj));
      })
      .catch((err) => {
        dispatch(setRequestErr(true));
        throw new Error(`Rates were not updated 🥲. ${err}`);
      })
      .finally(() => {
        dispatch(toggleLoadingStatus());
      });
  };
};
