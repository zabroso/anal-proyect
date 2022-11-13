import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Multiparametro } from './components/Multiparametro'
import { Login } from './components/Login'
import { Navbar } from './components/Navbar'
import { Hola } from './components/Hola'

export const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Hola/>} />
        <Route path='/multiparametro' element={ <Multiparametro/>} />
        <Route path='/login' element={ <Login/>} />
      </Routes>
    </div>
  )
}
