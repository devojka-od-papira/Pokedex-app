import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rotoReducer from "../reducers";

const midlleware = [thunk];

const store = createStore(
  rotoReducer,
  {},
  composeWithDevTools(applyMiddleware(...midlleware))
);
export { store };
