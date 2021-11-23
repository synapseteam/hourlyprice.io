export const MODIFY_FIELDS_DATA = "MODIFY_FIELDS_DATA";
export const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING";
export const CLEAR_FIELDS_STATE = "CLEAR_FIELDS_STATE";

export const SET_REQUEST_ERR = "TOGGLE_REQUEST_ERR";

export const submitFieldsData = (val) => {
  return {
    type: MODIFY_FIELDS_DATA,
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
