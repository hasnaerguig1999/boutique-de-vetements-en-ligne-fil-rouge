import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, getProduct } from '../../redux/Actions/ProductAction';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector(state => state.products.product);

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    oldPrice: '',
    quantity: '',
    inStock: '',
    image: ''
  });

  const handleChangeImage = (e) => {
    setProductData({
      ...productData,
      image: URL.createObjectURL(e.target.files[0])
    });
  };


  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);


  const handleUpdate = async (id) => {
    try {
      await dispatch(updateProduct(id, productData));
      Swal.fire(
        'Updated!',
        'Your product has been updated.',
        'success'
      );
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      Swal.fire(
        'Error!',
        'There was an error updating your product.',
        'error'
      );
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="main-content mt-0">
      <div className='page-header align-items-start min-vh-100'>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom  mt-2">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0  mt-2">Edit product</h4>
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
                    {product ? (
                      <form className="text-start" onSubmit={(e) => { e.preventDefault(); handleUpdate(product.id); }}>
                        <div className="input-group input-group-outline my-3">
                          <input type="text" className="form-control" placeholder='Title' name="title" value={productData.title} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input type="text" className="form-control" placeholder='Description' name="description" value={productData.description} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline my-3">
                          <input type="text" className="form-control" placeholder='Price' name="price" value={productData.price} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline my-3">
                          <input type="text" className="form-control" placeholder='OLD Price' name="oldPrice" value={productData.oldPrice} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline my-3">
                          <input type="text" className="form-control" placeholder='quantity' name="quantity" value={productData.quantity} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline my-3">
                          <input type="text" className="form-control" placeholder='inStock' name="inStock" value={productData.inStock} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input type="file" className="form-control" placeholder='Image' name="image" onChange={handleChangeImage} />
                          {productData.image && <img src={productData.image} style={{width:'41px'}} alt="Product" />}
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Update Product</button>
                        </div>
                      </form>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
