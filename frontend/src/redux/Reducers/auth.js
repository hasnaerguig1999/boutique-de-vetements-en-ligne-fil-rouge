const storedToken = JSON.parse(localStorage.getItem('userData'));
const initialState = {
  auth: {
    users: [],
    user: storedToken,
    token: storedToken?.token,
    role: storedToken?.role,
    error: null,
    loading: false,
    isLoggedIn: Boolean(storedToken),
    name: storedToken?.name,
    
    
  },
};

const authreducer = (state = initialState, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case 'AUTH_REQUEST':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: null,
        },
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload.user,
          token: action.payload.user.token,
          loading: false,
          error: null,
        },
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('userData', JSON.stringify(action.payload.user));;
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload.user,
          token: action.payload.user.token,
          loading: false,
          error: null,
        },
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        auth: {
          ...state.auth,
          name: action.payload.name,
        },
      };



    case 'AUTH_FAIL':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: action.payload,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        name: null,
        token: null,
        isLoggedIn: false,
      };
      case 'GET_ALL_USERS_REQUEST':
        return {
           ...state, 
           loading: true,
            error: null
           };
           case 'GET_ALL_USERS_SUCCESS':
            return {
              ...state,
              auth: {
                ...state.auth,
                loading: false,
                users: action.payload, 
                error: null,
              },
            };
                 case 'GET_ALL_USERS_FAILURE':
      return { 
        ...state, 
        loading: false,
         error: action.payload
         };

    default:
      return state;
  }
};

export default authreducer;