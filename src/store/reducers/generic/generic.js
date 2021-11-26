import {
  MODIFY_FIELDS_DATA,
  TOGGLE_IS_LOADING,
  SET_REQUEST_ERR,
  CLEAR_FIELDS_STATE,
} from "store/actions/generic";

const initialState = {
  fields: {
    price: "",
    time: "",
    currency: "USD",
  },
  isLoading: false,
  ratesRequestErr: false,
};

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case MODIFY_FIELDS_DATA:
      return {
        ...state,
        fields: {
          ...state.fields,
          ...action.payload,
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
          ...initialState.fields,
        },
      };
    default:
      return state;
  }
}
