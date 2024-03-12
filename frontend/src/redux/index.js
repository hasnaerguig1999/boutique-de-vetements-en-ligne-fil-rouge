import { createStore, applyMiddleware, combineReducers } from "redux";
import Productreducer from "./Reducers/Productreducer"
import categoryReducer from "./Reducers/Categoryreducer";

import authreducer from "./Reducers/auth";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
  products: Productreducer,
  auth: authreducer,
  categories: categoryReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;