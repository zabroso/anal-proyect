import React from 'react'
import { Link } from 'react-router-dom'
import "../index.css";

export const Navbar = () => {
  return (
    <div className='navbar'>
        <div>
            <Link to="/">Home</Link>
        </div>
        <ul>
            <li>
                <Link to="/multiparametro">Sensor Multi-parámetro</Link>
            </li>
            <li>
                <Link to="/login">Ingresar</Link>
            </li>
        </ul>
    </div>
  )
}
