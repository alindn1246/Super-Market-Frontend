import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MyProperty from './MyProperty';
import Header from './components/header/Header';
import HeaderBottom from './components/header/HeaderBottom';
import DisplayProducts from './components/DisplayProducts';
import LandingPage from './components/LandingPage';
import LoginForm from './components/Auth/LoginForm';
import OrderProduct from './components/orderProduct/OrderProduct';
import AdminHomePage from './components/Admin/AdminHomePage';
import ProductMange from './components/Admin/ProductMange'
import CreateProduct from './components/Admin/crudOperations/CreateProduct'
import UpdateProduct from './components/Admin/crudOperations/UpdateProduct'
import MangeOrders from './components/Admin/crudOperations/MangeOrders';
import EditOrderProduct from './components/Admin/crudOperations/EditOrderProduct';
import AdminNavBar from './components/Admin/AdminNavBar';
import HeaderBottomAdmin from './components/Admin/HeaderBottomAdmin';
import Users from './components/Admin/crudOperations/Users'
import RegistrationForm from './components/Auth/RegistrationForm'
import DisplayProductDetails from './components/DisplayProductDetails';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/Admin');

  return (
    <>
      {isAdminPage ? (
        <>
        <AdminNavBar/>
        <HeaderBottomAdmin/>

        </>
      ) : (
        <>
        <Header />
        <HeaderBottom />
      </>
        
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/MyProperty" element={<MyProperty />} />
        <Route path="/displayproduct/:type" element={<DisplayProducts />} />
        <Route path="/product/:productId" element={< DisplayProductDetails/>} />
        <Route path="/LogIn" element={<LoginForm />} />
        <Route path="/Register" element={<RegistrationForm />} />
        <Route path="/Admin" element={<AdminHomePage />} />
        <Route path="/Admin/Order/:orderId" element={<OrderProduct />} />
        <Route path="/Admin/MangeContent/:type" element={<ProductMange/>} />
        <Route exact path="/Admin/create-product/:type" element={<CreateProduct/>} />
     <Route exact path="/Admin/edit-product/:type/:productId" element={<UpdateProduct/>} />
     <Route exact path="/Admin/Orders" element={<MangeOrders/>} />
     <Route exact path="/Admin/edit-order/:orderId" element={<EditOrderProduct/>} />
     <Route exact path="/Admin/Users" element={<Users/>} />

    
      </Routes>
    </>
  );
};

export default App;
