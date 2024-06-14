import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './Register'
import Login from './Login'
import Dashbord from './Dashbord'
import AdminRegister from '../component/Admin/AdminRegister'
import Admindashbord from './Admin/Admindashbord'
import AdminLogin from './Admin/Adminlogin'
import AddProductForm from './Products/Addproducts'
import ProductList from './Products/GetProducts'
import Addview from './Products/Addview'
import Orders from './Products/Orders'

function Homescreen() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashbord/>}/>
        <Route path='/admin' element={<AdminRegister/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/admindashbord' element={<Admindashbord/>}/>
        <Route path='/addproducts' element={<AddProductForm/>}/>
        <Route path='/getproduct' element={<ProductList/>}/>
        <Route path='/addview' element={<Addview/>}/>
        <Route path='/order' element={<Orders/>}/>


      </Routes> 
    </div>
  )
}

export default Homescreen
