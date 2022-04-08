import * as constants from "./constants";

const initialState = {
  count: 0,
  loading: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.INCREASE_COUNT:
      return { ...state, count: state.count + 1 };
    case constants.DECREASE_COUNT:
      return { ...state, count: state.count - 1 };
    case constants.RESET_COUNT:
      return initialState;
    case constants.SET_IS_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default todoReducer;
