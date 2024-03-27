import axios from 'axios';
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

export const addToCart = (id, quantity) => async dispatch => {
  try {
    const res = await axios.get(`/products/${id}`);
    const product = res.data;

    let cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    const existItem = cart.find(x => x.product.id === product.id);

    if (existItem) {
      cart = cart.map(x => x.product.id === existItem.product.id ? { product, quantity } : x);
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart
    });
  } catch (err) {
    console.error(err);
  }
};