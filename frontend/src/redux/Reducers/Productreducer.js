
import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT ,PRODUCT_CREATE_SUCCESS,UPDATE_PRODUCT_CATEGORY,ADD_TO_CART} from '../Actions/ProductAction';
import  {getCartFromLocalStorage} from '../utils/localStorage';

// Initial state
const initialState = {
  products: [],
  success: false,
  product: null,
  cartItems: getCartFromLocalStorage()
};


// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        success: true, 
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
      case UPDATE_PRODUCT_CATEGORY:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? { ...product, categoryId: action.payload.categoryId } : product
        ),
      };
      case ADD_TO_CART:
        return(
          {
            ...state,
            cartItems: getCartFromLocalStorage()
          }
        )
    default:
      return state;
  }
};

export default productReducer;