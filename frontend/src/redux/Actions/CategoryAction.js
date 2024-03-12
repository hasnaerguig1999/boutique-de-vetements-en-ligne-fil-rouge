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
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

// Action creators
export const getAllCategories = () => async dispatch => {
  try {
    const res = await axios.get('/categories');
    dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};



