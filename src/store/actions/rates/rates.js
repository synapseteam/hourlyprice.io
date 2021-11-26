import { toggleLoadingStatus, setRequestErr } from "store/actions/generic";
import { ratesDataAPI } from "api/api";

export const SET_NEW_RATES = "SET_NEW_RATES";
export const SET_MANUAL_RATES = "SET_MANUAL_RATES";

export const setNewRates = (newRates) => {
  return { type: SET_NEW_RATES, payload: newRates };
};

export const setManualRates = (manualRatesData) => {
  return { type: SET_MANUAL_RATES, payload: manualRatesData };
};

export const getNewRatesThunkCreator = () => {
  return (dispatch) => {
    dispatch(toggleLoadingStatus());
    ratesDataAPI
      .getRates()
      .then((newRatesObj) => {
        dispatch(setNewRates({ ...newRatesObj, ratesSource: "MasterCard" }));
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
