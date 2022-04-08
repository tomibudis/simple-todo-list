import * as constants from "./constants";

export const increaseCount = () => {
  return {
    type: constants.INCREASE_COUNT,
  };
};

export const decreaseCount = () => {
  return {
    type: constants.DECREASE_COUNT,
  };
};

export const resetCount = () => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    await new Promise((resolve) => setTimeout(resolve, 3000));

    dispatch({
      type: constants.RESET_COUNT,
    });
    dispatch(setIsLoading(false));
  };
};

export const setIsLoading = (isLoading = false) => {
  return {
    type: constants.SET_IS_LOADING,
    payload: isLoading,
  };
};
