import { Link } from 'react-router-dom';
import Sidebar from '../Sidebars/Sidebar'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories,getCategory,deleteCategory} from '../../redux/Actions/CategoryAction';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';





export default function CategoriesManagement() {
    

  const handleEdit = (categoryId) => {
    dispatch(getCategory(categoryId));
  };



  const handleDelete = (categoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(categoryId));
        Swal.fire(
          'Deleted!',
          'Your category has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your category is safe :)',
          'error'
        )
      }
    })
  };
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

 

  const { isLoggedIn, role } = useSelector(state => state.auth.auth);









  if (!isLoggedIn) {
    window.location.href = '/SignIn';
  } else {


    return (
      <>
        <div className="g-sidenav-show  bg-gray-200" style={{ height: '158vh' }} >
          <Sidebar />
          <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg " >
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
              <div className="container-fluid py-1 px-3">
                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div className="input-group input-group-outline">

                      <Link className="btn btn-outline-primary btn-sm mb-0 me-0 p-0nav-link text-primary" to="/AddProduct">Add More</Link>


                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="container-fluid py-4" >
              <div className='container' id="contai">
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="contain" style={{ marginTop: '70px' }}>
                  </div>
                  <div className="card my-2 w-75" id="containere">

                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3" id="gradient">
                        <h6 className="text-white text-capitalize ps-3">Category info</h6>
                      </div>
                    </div>
                    <div className="card-body px-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">image</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">description</th>


                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">action</th>
                              <th className="text-secondary opacity-7"> </th>


                            </tr>
                          </thead>
                          <tbody>
                            {categories.map(category => (
                              <tr key={category.id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      <img src={category.image} className="avatar avatar-sm me-3 border-radius-lg" alt="category" />
                                    </div>

                                  </div>
                                </td>
                                <td>
                                  <p className="text-xs mb-0">{category.name}</p>

                                </td>

                                <td>
                                  <p className="text-xs mb-0">{category.description}</p>

                                </td>
                                
                                <td className="align-middle">
                                  <Link to={`/EditCategory/${category.id}`} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit product" onClick={() => handleEdit(category.id)} >
                                    <FaEdit />
                                  </Link>
                                </td>
                                <td className="align-middle">
                                  <button className="btn border-none text-secondary font-weight-bold text-xs" onClick={() => handleDelete(category.id)}
                                   id='deleteBtn'
                                  >
                                      <MdDelete />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </main>
        </div>
      </>
    )
  }
}

