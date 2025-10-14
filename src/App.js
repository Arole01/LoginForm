import React from 'react'
import { AuthContext } from './Pages/authContext'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import './App.css' 
import  {SingleProduct} from "./Pages/SingleProduct"
import  Signup from "./Pages/Signup"
import { ToastContainer } from 'react-toastify'
import {Login} from './Pages/Login'
import { CartProvider } from './Pages/cartContext'
import { Cart } from './Pages/Cart'
const App = () => {
  return (
    
      <BrowserRouter>
      <AuthContext>
        <CartProvider>
      <ToastContainer position='top-right' autoClose={1000}></ToastContainer>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<SingleProduct/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </CartProvider>
      </AuthContext>
      </BrowserRouter>
  )
}

export default App
