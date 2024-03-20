
import { GET_ALL_CATEGORIES, GET_CATEGORY } from '../Actions/CategoryAction';


const initialState = {
  categories: [],
  loading: false,
  error: null,

};


const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
      case GET_CATEGORY:
        return {
          ...state,
          category: action.payload,
        };
       case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
      };

    default:
      return state;
  }
};

export default categoryReducer;