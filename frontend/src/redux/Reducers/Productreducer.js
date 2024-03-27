
import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT ,PRODUCT_CREATE_SUCCESS,UPDATE_PRODUCT_CATEGORY,ADD_TO_CART} from '../Actions/ProductAction';

// Initial state
const initialState = {
  products: [],
  success: false,
  product: null,
  cartItems: [],
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
        const item = action.payload;
        const existItem = state.cartItems.find(x => x.product.id === item.product.id);
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map(x => x.product.id === existItem.product.id ? item : x)
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item]
          };
        }
    default:
      return state;
  }
};

export default productReducer;