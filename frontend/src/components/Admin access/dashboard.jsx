import { Link } from 'react-router-dom';
import Sidebar from '../Sidebars/Sidebar'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, getProduct, updateProduct } from '../../redux/Actions/ProductAction';
import { getCategory } from '../../redux/Actions/CategoryAction';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';





export default function Dashboard() {

  

  const handleEdit = (productId) => {
    dispatch(getProduct(productId));
  };



  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(productId));
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        )
      }
    })
  };
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const { categories } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getProducts());
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
                        <h6 className="text-white text-capitalize ps-3">Product info</h6>
                      </div>
                    </div>
                    <div className="card-body px-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">image</th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">title</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">description</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">old price</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> price</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">quantity</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">in stock</th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Category of product</th>


                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">action</th>
                              <th className="text-secondary opacity-7"> </th>


                            </tr>
                          </thead>
                          <tbody>
                            {products.map(product => {
                              return (
                                <tr key={product.id}>
                                  <td>
                                    <div className="d-flex px-2 py-1">
                                      <div>
                                        <img src={`http://localhost:8000/uploads/${product.image}`} className="avatar avatar-sm me-3 border-radius-lg" alt="product" />
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="text-xs mb-0">{product.title}</p>

                                  </td>

                                  <td>
                                    <p className="text-xs mb-0">{product.description}</p>

                                  </td>
                                  <td>
                                    <p className="text-xs mb-0">{product.oldPrice}</p>

                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">{product.price}</p>

                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">{product.quantity}</p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">{ product.category?.name }</p>
                                  </td>
                                  <td className="align-middle">
                                    <Link to={`/editProduct/${product.id}`} className="btn btn-primary btn-sm me-2" data-toggle="tooltip" data-original-title="Edit product" onClick={() => handleEdit(product.id)} >
                                      <FaEdit />
                                    </Link>

                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}
                                      id='deleteBtn'
                                    >
                                      <MdDelete />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
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

