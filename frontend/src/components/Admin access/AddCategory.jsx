import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../redux/Actions/CategoryAction';
import axios from 'axios';





const AddCategory = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { categories } = useSelector(state => state.categories);




    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory({
            name,
            description,
            image,

        })).then(() => {
            navigate('/CategoriesManagement');
        });

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return
        const formData = new FormData();
        formData.append('image', file);
        axios.post('/upload', formData).
            then(res => res.data)
            .then(({ filename }) => {
                setImage(filename)
            })
    }




    const { isLoggedIn, role } = useSelector(state => state.auth.auth);
    if (!isLoggedIn) {
        window.location.href = '/SignIn';
    } else {
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
                                                <h4 className="text-white font-weight-bolder text-center mt-2 mb-0  mt-2">Add Product</h4>
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
                                                <form className="text-start" onSubmit={handleSubmit}>
                                                    <div className="input-group input-group-outline my-3">
                                                        <input type="text" className="form-control" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                    <div className="input-group input-group-outline mb-3">
                                                        <input type="text" className="form-control" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    </div>
                                                    <div className="input-group input-group-outline my-3">
                                                        <input type="file" className="form-control" placeholder='Image' onChange={handleImageChange} />
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Submit</button>
                                                    </div>
                                                </form>
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
            </>
        )
    }
}
export default AddCategory;