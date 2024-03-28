import './App.css';
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux';
import store from '../src/redux/index';
import Dashboard from './components/Admin access/dashboard'
import DisplayProduct from './components/Clients access/DisplayProduct'
import EditProduct from './components/Admin access/EditProduct'
import CategoriesManagement from './components/Admin access/CategoriesManagement'
import EditCategory from './components/Admin access/EditCategory'
import AddCategory from './components/Admin access/AddCategory'

import AddProduct from './components/Admin access/AddProduct'
import AdminRoute from './components/routes/AdminRoute'
import UserRoute from './components/routes/UserRoute'
import ProductDetail from './components/Clients access/ProductDetail'


function App() {
  return (
    <>
    <Provider store={store}>
      <div className="App">


        <Router>
          <Routes>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/Dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path="/EditProduct/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
            <Route path="/AddProduct" element={<AdminRoute><AddProduct /></AdminRoute>} />
            <Route path="/AddCategory" element={<AdminRoute><AddCategory /></AdminRoute>} />
            <Route path="/CategoriesManagement" element={<AdminRoute><CategoriesManagement /></AdminRoute>} />
            <Route path="/EditCategory/:id" element={<AdminRoute><EditCategory /></AdminRoute>} />
            <Route path="/DisplayProduct" element={<UserRoute><DisplayProduct /></UserRoute>} />
            <Route path="/ProductDetail/:id" element={<UserRoute><ProductDetail /></UserRoute>} />

           
          </Routes>
        </Router>
      </div>
      </Provider>
    </>
  );
}

export default App;
