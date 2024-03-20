import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory, getCategory } from '../../redux/Actions/CategoryAction';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EditCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const category = useSelector(state => state.categories.category);

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleChangeImage = (e) => {
    setCategoryData({
      ...categoryData,
      image: URL.createObjectURL(e.target.files[0])
    });
  };


  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);


  const handleUpdate = async (id) => {
    try {
      await dispatch(updateCategory(id, categoryData));
      Swal.fire(
        'Updated!',
        'Your category has been updated.',
        'success'
      );
      navigate('/CategoriesManagement');
    } catch (err) {
      console.error(err);
      Swal.fire(
        'Error!',
        'There was an error updating your category.',
        'error'
      );
    }
  };

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
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
                    {category ? (
                      <form className="text-start" onSubmit={(e) => { e.preventDefault(); handleUpdate(category.id); }}>
                        <div className="input-group input-group-outline my-3">
                          <input type="text" className="form-control" placeholder='Name' name="name" value={categoryData.name} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input type="text" className="form-control" placeholder='Description' name="description" value={categoryData.description} onChange={handleChange} />
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <input type="file" className="form-control" placeholder='Image' name="image" onChange={handleChangeImage} />
                          {categoryData.image && <img src={categoryData.image} style={{width:'41px'}} alt="category" />}
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Update category</button>
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
