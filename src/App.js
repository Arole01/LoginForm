import React from 'react'
import { AppProvider } from './Context'
import { BrowserRouter,Route, Routes, Link } from 'react-router-dom'
import { Home } from './Pages/Home'
import './App.css' 
import  {SingleProduct} from "./Pages/SingleProduct"
import  Signup from "./Pages/Signup"
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
      <ToastContainer position='top-right' autoClose={1000}></ToastContainer>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<SingleProduct/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
