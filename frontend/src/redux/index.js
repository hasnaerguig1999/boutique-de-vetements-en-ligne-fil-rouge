import { createStore, applyMiddleware, combineReducers ,compose } from "redux";
import Productreducer from "./Reducers/Productreducer"
import categoryReducer from "./Reducers/Categoryreducer";

import authreducer from "./Reducers/auth";
import { thunk } from "redux-thunk";




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  products: Productreducer,
  auth: authreducer,
  categories: categoryReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;