import axios from "axios";
import * as constants from "./constants";

const URI = "https://jsonplaceholder.typicode.com";
const ENDPOINT = "/posts";

const generateRequest = (totalRequest: number) => {
  const request = [];
  for (let i = 0; i < totalRequest; i++) {
    request.push(axios.get(`${URI + ENDPOINT}/${i + 1}`));
  }
  return request;
};

const setIsLoading = (isLoading: boolean) => {
  return {
    type: constants.SET_LOADING,
    payload: isLoading,
  };
};

export const fetchTodos = () => {
  return async (dispatch) => {
    await dispatch(setIsLoading(true));
    axios.all(generateRequest(100)).then(
      axios.spread((...response) => {
        response.map((res) => {
          const { id, body, title, userId } = res?.data || {};
          dispatch({
            type: constants.SET_TODOS,
            payload: {
              id,
              body,
              title,
              userId,
            },
          });
        });
        dispatch(setIsLoading(false));
      })
    );
  };
};
