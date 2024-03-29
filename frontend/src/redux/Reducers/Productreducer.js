
import { GET_PRODUCTS, GET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCT_CREATE_SUCCESS, UPDATE_PRODUCT_CATEGORY, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, SET_CART_ITEMS } from '../Actions/ProductAction';
import { getCartFromLocalStorage } from '../utils/localStorage';

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
      return (
        {
          ...state,
          cartItems: getCartFromLocalStorage()
        }
      );
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product.id !== action.payload),
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload
      };
    case UPDATE_CART:
      {
        const { productId, quantity } = action.payload;
        const productIndex = state.cartItems.findIndex(item => item.product && item.product.id === productId);

        if (productIndex !== -1) {
          const updatedProduct = {
            ...state.cartItems[productIndex],
            quantity: quantity
          };

          return {
            ...state,
            cartItems: [
              ...state.cartItems.slice(0, productIndex),
              updatedProduct,
              ...state.cartItems.slice(productIndex + 1)
            ]
          };
        }

        return state;
      }
    default:
      return state;
  }
};

export default productReducer;