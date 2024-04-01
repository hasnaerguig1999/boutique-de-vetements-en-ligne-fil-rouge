import axios from 'axios';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../utils/localStorage';
axios.defaults.baseURL = "http://localhost:8000"
axios.interceptors.request.use((req) => {
  if (!localStorage.getItem('userData')) return req
  const user = JSON.parse(localStorage.getItem('userData'))
  const token = user.token
  req.headers.Authorization = `Bearer ${token}`;


  return req;
});

// Action types
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT_CATEGORY = 'UPDATE_PRODUCT_CATEGORY';
export const ADD_TO_CART = 'ADD_TO_CART';
export const INIT_CART = 'INIT_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';




// Action creators
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/products');
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const getProduct = (id) => async dispatch => {
  try {
    const res = await axios.get(`/products/${id}`);
    dispatch({ type: GET_PRODUCT, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createProduct = productData => async dispatch => {
  try {
    const res = await axios.post('/products', productData);
    dispatch({ type: CREATE_PRODUCT, payload: res.data });
    dispatch({ type: PRODUCT_CREATE_SUCCESS });
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = (id, updatedData) => async dispatch => {
  try {
    const res = await axios.put(`/products/${id}`, updatedData);
    dispatch(getProducts())
  } catch (err) {
    console.error(err);
  }
};



export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (err) {
    console.error(err);
  }
};

export const addToCart = (product, quantity) => {
  let cartItems = getCartFromLocalStorage();
  const existingProductIndex = cartItems.findIndex(item => item.product.id === product.id);

  if (existingProductIndex >= 0) {
    // Le produit existe déjà dans le panier, donc augmenter la quantité
    const existingProduct = cartItems[existingProductIndex];
    cartItems[existingProductIndex] = { ...existingProduct, quantity: existingProduct.quantity + quantity };
  } else {
    // Le produit n'existe pas dans le panier, donc l'ajouter
    const newProduct = { product, quantity };
    cartItems = [...cartItems, newProduct];
  }

  saveCartToLocalStorage(cartItems);

  return {
    type: ADD_TO_CART,
  };
};
export const updateCart = (productId, quantity) => {
  let cartItems = getCartFromLocalStorage();
  const productIndex = cartItems.findIndex(item => item.product.id === productId);

  if (productIndex !== -1) {
    if (quantity < 1) {
      // Set the quantity to 1
      quantity = 1;
    }

    // Update the quantity of the product
    const updatedProduct = { ...cartItems[productIndex], quantity };
    cartItems = [
      ...cartItems.slice(0, productIndex),
      updatedProduct,
      ...cartItems.slice(productIndex + 1)
    ];

    // Save the updated cart to localStorage
    saveCartToLocalStorage(cartItems);

    return {
      type: UPDATE_CART,
      payload: { productId, quantity }
    };
  }

  return { type: 'DO_NOTHING' };
};


export const setCartItems = (items) => {
  return {
    type: 'SET_CART_ITEMS',
    payload: items
  };
};

export const removeFromCart = productId => {
  let cartItems = getCartFromLocalStorage();
  cartItems = cartItems.filter(item => item.product.id !== productId);
  saveCartToLocalStorage(cartItems);

  return {
    type: REMOVE_FROM_CART,
    payload: productId
  };
};


export const paymentSuccess = () => {
  // Afficher une alerte
  window.alert('Vous avez payé avec succès');

  // Supprimer les produits du panier du localStorage
  localStorage.removeItem('cart');

  return {
    type: PAYMENT_SUCCESS,
  };
};