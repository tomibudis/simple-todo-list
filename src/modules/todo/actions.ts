import axios from "axios";
import { FormTodo } from "~src/types/form";
import * as constants from "./constants";

const URI = "https://jsonplaceholder.typicode.com";
const ENDPOINT = URI + "/posts";

const generateRequest = (totalRequest: number) => {
  const request = [];
  for (let i = 0; i < totalRequest; i++) {
    request.push(axios.get(`${ENDPOINT}/${i + 1}`));
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

export const createTodo = (values: FormTodo) => {
  return async (dispatch) => {
    dispatch({
      type: constants.SET_LOADING_ADD,
      payload: true,
    });

    axios.post(ENDPOINT).then(() => {
      dispatch({
        type: constants.ADD_TODO,
        payload: values,
      });

      dispatch({
        type: constants.SET_LOADING_ADD,
        payload: false,
      });
    });
  };
};

export const editTodo = (values: FormTodo, id: number) => {
  return async (dispatch) => {
    dispatch({
      type: constants.SET_LOADING_EDIT,
      payload: true,
    });

    axios.patch(ENDPOINT.concat(`/${id}`)).then(() => {
      dispatch({
        type: constants.EDIT_TODO,
        payload: values,
      });
      dispatch({
        type: constants.SET_LOADING_EDIT,
        payload: false,
      });
    });
  };
};

export const deleteTodo = (id: number, index: number) => {
  return async (dispatch) => {
    dispatch({
      type: constants.SET_LOADING_DELETE,
      payload: true,
    });
    axios.delete(ENDPOINT.concat(`/${id | index}`)).then(() => {
      dispatch({
        type: constants.DELETE_TODO,
        payload: index,
      });
      dispatch({
        type: constants.SET_LOADING_DELETE,
        payload: false,
      });
    });
  };
};
