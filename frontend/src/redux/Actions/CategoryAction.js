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
export const GET_CATEGORY = 'GET_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';


export const getAllCategories = () => async dispatch => {
  try {
    const res = await axios.get('/categories');
    dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateCategory = (id, updatedData) => async dispatch => {
  try {
    const res = await axios.put(`/categories/${id}`, updatedData);
    dispatch({ type: UPDATE_CATEGORY, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
export const getCategory = (id) => async dispatch => {
  try {
    const res = await axios.get(`/categories/${id}`);
    dispatch({ type: GET_CATEGORY, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};
export const deleteCategory = (id) => async dispatch => {
  try {
    await axios.delete(`/categories/${id}`);
    dispatch(getAllCategories());
  } catch (err) {
    console.error(err);
  }
}





