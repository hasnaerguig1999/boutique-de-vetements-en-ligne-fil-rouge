
import axios from 'axios';
import * as types from '../Type/AuthType';
axios.defaults.baseURL = "http://localhost:8000"


export const signup = (name, email, password) => async (dispatch) => {


  try {
    dispatch({ type: types.AUTH_REQUEST });
    const { data } = await axios.post('/auth/register', { name, email, password });
    console.log(data)
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.AUTH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_REQUEST });
    const { data } = await axios.post('/auth/login', { email, password });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userData', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.user.token));
    localStorage.setItem('role', JSON.stringify(data.user.role));
    localStorage.setItem('userId', JSON.stringify(data.user.id));
    if (data.user.role === 'user') {
      window.location.href = "/DisplayProduct";
    } else if (data.user.role === 'admin') {
      window.location.href = "/Dashboard";
    }
  } catch (error) {
    dispatch({
      type: types.AUTH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  window.location.href = "/SignIn"; 
  localStorage.clear();
  dispatch({ type: types.LOGOUT });
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ALL_USERS_REQUEST' });

    const response = await axios.get('/auth');

    dispatch({
      type: 'GET_ALL_USERS_SUCCESS',
      payload: response.data.users,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_USERS_FAILURE',
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};