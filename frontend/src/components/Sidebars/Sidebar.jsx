import { NavLink } from 'react-router-dom';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from '../../redux/Actions/AuthAction';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useSelector(state => state.auth.auth.name);
  const isLoggedIn = useSelector(state => state.auth.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/SignIn');
  }
  

  return (
    <>
      <div className="g-sidenav-show bg-gray-200">
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
          <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
              <img src="../assets/img/logos/logosyndic.png" className="navbar-brand-img h-100" alt="main_logo" />
              <span className="ms-1 font-weight-bold text-white">HStore</span>
            </a>
          </div>
          <hr className="horizontal light mt-0 mb-2" />
          <div className="collapse navbar-collapse   w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="../Dashboard">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">dashboard</i>
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white " to="../ApartementManagement">
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1"> product Management</span>
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white " to="../SuperAdmin">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">person</i>
                      </div>
                      <span className="nav-link-text ms-1"> {name ? (name) : 'User'}</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white " to="../SignIn" onClick={handleLogout}>
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <RiLogoutBoxLine id="logout" />
                      </div>
                      <span className="nav-link-text ms-1">Logout</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white " to="../SignIn">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">login</i>
                      </div>
                      <span className="nav-link-text ms-1">Sign In</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-white " to="../SignUp">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">assignment</i>
                      </div>
                      <span className="nav-link-text ms-1">Sign Up</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}