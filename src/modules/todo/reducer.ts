import * as constants from "./constants";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LOADING:
      return {
        ...state,
        isError: false,
        isLoading: action.payload,
      };
    case constants.SET_TODOS:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case constants.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default todoReducer;
