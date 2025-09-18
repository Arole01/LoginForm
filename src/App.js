import React from 'react'
import { AppProvider } from './Context'
import { BrowserRouter,Route, Routes, Link } from 'react-router-dom'
import {Login} from './Login'
import { Home } from './Pages/Home'
import './App.css' 
const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
