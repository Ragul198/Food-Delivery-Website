import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink , Link } from 'react-router-dom'

const sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={'/add'} className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add item</p>
        </NavLink >
        <NavLink to={'/list'} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List items</p>
        </NavLink>
        <NavLink to={'/order'} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Oreder items</p>
        </NavLink>
      </div>
    </div>
  )
}

export default sidebar