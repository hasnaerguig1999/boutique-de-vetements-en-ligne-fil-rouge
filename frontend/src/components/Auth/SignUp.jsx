import React, { useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { signup } from '../../redux/Actions/AuthAction';
import { Navigate } from 'react-router-dom';



const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn , role} = useSelector(state => state.auth.auth);

  const handleSignUp = () => {
    dispatch(signup(name, email, password));
    
  };
  if (isLoggedIn) {
    if(role === 'user'){
      return <Navigate to="/DisplayProduct" />;
    }else if(role === 'admin'){
      return <Navigate to="/Dashboard" />;
    }
  }else{
  return (
    <>
      <div className="main-content mt-0">
        <div className='page-header align-items-start min-vh-100'>
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom  mt-2">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0  mt-2">Sign Up</h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                        </div>
                        <div className="col-2 text-center px-1">
                        </div>
                        <div className="col-2 text-center me-auto">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body">
                      <form>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                            onClick={handleSignUp}
                          >
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <a href="./Dashboard" className="text-primary text-gradient font-weight-bold">return to dashboard</a>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )}
}
export default SignUp;
