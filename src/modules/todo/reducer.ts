import * as constants from "./constants";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],

  isLoadingAdd: false,
  isLoadingEdit: false,
  isLoadingDelete: false,
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

    // ADD TODO
    case constants.SET_LOADING_ADD:
      return {
        ...state,
        isLoadingAdd: action.payload,
      };
    case constants.ADD_TODO:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };

    // EDIT TODO
    case constants.SET_LOADING_EDIT:
      return {
        ...state,
        isLoadingEdit: action.payload,
      };
    case constants.EDIT_TODO:
      state.data[action.payload.index] = action.payload;
      return state;

    // DELETE TODO
    case constants.SET_LOADING_DELETE:
      return {
        ...state,
        isLoadingDelete: action.payload,
      };
    case constants.DELETE_TODO:
      const newData = state.data.filter((_, index) => action.payload !== index);
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
};

export default todoReducer;
