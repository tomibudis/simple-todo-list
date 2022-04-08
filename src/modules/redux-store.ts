import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import todoReducer from "./todo/reducer";

const reducers = combineReducers({
  todos: todoReducer,
});

const storeEnhancers = composeWithDevTools({
  name: "Simple Todo App | Hellotoms",
})(applyMiddleware(thunk));

const makeStore = (initialState: any) => {
  return createStore(reducers, initialState, storeEnhancers);
};

export default makeStore;
