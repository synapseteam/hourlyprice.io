export const SUBMIT_FIELDS_DATA = "SUBMIT_FIELDS_DATA";
export const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
export const CLEAR_FIELDS_STATE = "CLEAR_FIELDS_STATE";

export const SET_REQUEST_ERR = "TOGGLE_REQUEST_ERR";

const initStateMain = {
  fields: {
    price: "",
    time: "",
    currency: "USD",
  },
  isLoading: false,
  ratesRequestErr: false,
};

export default function mainReducer(state = initStateMain, action) {
  switch (action.type) {
    case SUBMIT_FIELDS_DATA:
      const { price, time, currency } = action.payload;
      return {
        ...state,
        fields: {
          ...state.fields,
          price,
          time,
          currency,
        },
      };
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case SET_REQUEST_ERR:
      return {
        ...state,
        ratesRequestErr: action.payload,
      };
    case CLEAR_FIELDS_STATE:
      return {
        ...state,
        fields: {
          ...state.fields,
          price: "",
          time: "",
          currency: "",
        },
      };
    default:
      return state;
  }
}

export const submitFieldsData = (val) => {
  return {
    type: SUBMIT_FIELDS_DATA,
    payload: val,
  };
};

export const toggleLoadingStatus = () => {
  return { type: TOGGLE_IS_LOADING, payload: null };
};

export const clearFormFields = () => {
  return { type: CLEAR_FIELDS_STATE, payload: null };
};

export const setRequestErr = (isRequestError) => {
  return { type: SET_REQUEST_ERR, payload: isRequestError };
};
