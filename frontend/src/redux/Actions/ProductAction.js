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
    dispatch({ type: UPDATE_PRODUCT, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};





// export const deleteProduct = id => async dispatch => {
//   try {
//     await axios.delete(`/products/${id}`);
//     dispatch({ type: DELETE_PRODUCT, payload: id });
//   } catch (err) {
//     console.error(err);
//   }
// };