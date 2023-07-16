import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Home from './Pages/Home'

function App() {

  const navigate = useNavigate()
  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    if (!User) navigate('/login');
  }, []);

  return (
    <> 
<Routes>
<Route path='/login' element={<Login/>} />
<Route path='/*' element={<Home/>} />
</Routes>
    </>
  )
}

export default App
