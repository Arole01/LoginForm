import React from 'react'
import { AppProvider } from './Context'
import { BrowserRouter,Route, Routes, Link } from 'react-router-dom'
import {Login} from './Login'
import { Home } from './Pages/Home'
import './App.css' 
import  {SingleProduct} from "./Pages/SingleProduct"
const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<SingleProduct/>}/>
      </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
