import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Sidebars/Sidebar'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, addToCart } from '../../redux/Actions/ProductAction';
import { getCategory } from '../../redux/Actions/CategoryAction';
import { FaCartArrowDown, FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';



export default function ProductDetail() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.product);
  const { categories } = useSelector(state => state.categories);
  // const cartItems = useSelector(state => state.products.cartItems);
  const cartItems = useSelector(state => state.products.cartItems);
  const total = cartItems.reduce((acc, item) => item.product ? acc + item.product.price * item.quantity : acc, 0);

  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn, role } = useSelector(state => state.auth.auth);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);


  if (!product) {
    return <div>Loading...</div>;
  }


  const addToCartHandler = () => {
    if (product && quantity) {

      dispatch(addToCart(product, quantity));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product has been added to cart',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      console.error('Product id or quantity is undefined');
    }
  };












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

                      <Link className="btn btn-outline-primary btn-sm mb-0 me-0 p-0nav-link text-primary" onClick={handleShow}>Cart</Link>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Cart</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                          {cartItems && cartItems.map((item, index) => (
                            item.product &&
                            <div key={index} className="card mb-3">
                              <div className="row g-0">
                                <div className="col-md-4">
                                  <img src={`http://localhost:8000/uploads/${item.product.image}`} className="img-fluid rounded-start" style={{ maxWidth: '150px' }} />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <h5 className="card-title">{item.product.title}</h5>
                                    <p className="card-text">{item.product.description}</p>
                                    <p className="card-text"><small className="text-muted">Quantity: {item.quantity}</small></p>
                                    <div className="d-flex justify-content-evenly">
                                      <button className="btn btn-primary mr-2"><FaEdit /></button>
                                      <button className="btn btn-danger"><FaTrash /></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between align-items-center">
  <div className="total-container">
    <h5 className="mb-0">Total:</h5>
    <h4 className="mb-0 text-primary">{total} $</h4>
  </div>

</Modal.Footer>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>

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
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> quantity</th>

                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Cart</th>


                              <th className="text-secondary opacity-7"> </th>


                            </tr>
                          </thead>
                          <tbody>


                            <tr >
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img src={`http://localhost:8000/uploads/${product.image}`} className="border-radius-lg" style={{ width: '100%', height: '70%' }} alt="product" />
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
                                <div className="input-group mt-3" style={{ width: '148px' }}>
                                  <button className="btn btn-outline-secondary mr-2" type="button" id="button-addon1" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                                    -
                                  </button>
                                  <input type="text" className="form-control text-center mx-2" value={quantity} readOnly />
                                  <button className="btn btn-outline-secondary ml-2" style={{ borderRadius: '8px' }} type="button" id="button-addon2" onClick={() => setQuantity(quantity + 1)}>
                                    +
                                  </button>
                                </div>
                              </td>
                              <td>
                                <button className="btn bg-gradient-success w-100 my-4 mb-4 ml-2" onClick={addToCartHandler}>
                                  <FaCartArrowDown />
                                </button>
                              </td>

                            </tr>

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

