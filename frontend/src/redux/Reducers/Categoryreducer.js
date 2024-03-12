
import { GET_ALL_CATEGORIES } from '../Actions/CategoryAction';

// Initial state
const initialState = {
  categories: [],
//   category: null,
loading: false,
  error: null,

};

// Reducer
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES :
      return {
        ...state,
        categories: action.payload,
      };
   
   
    default:
      return state;
  }
};

export default categoryReducer;