import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {storeContext} from "../../context/storecontext"

const Navbar = ({ setLogin }) => {
  const {cart_item_count , setToken , token} = useContext(storeContext);
  const [menu, setMenu] = useState("home");
  const navigate =useNavigate();
  const logout = ()=>{
    localStorage.removeItem('token');
    setToken("");
    navigate('/');
    window.location.reload();

  }

  
 
  
  
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.parota_logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#download"
          className={menu === "mobile app" ? "active" : ""}
          onClick={() => setMenu("mobile app")}
        >
          Mobile App
        </a>
        <a
          href="#contact"
          className={menu === "contact us" ? "active" : ""}
          onClick={() => setMenu("contact us")}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt={assets.search_icon} />
        <div className="search">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt={assets.basket_icon} />
          </Link>
          <div className="dot">
            {!cart_item_count()?"":<p>{cart_item_count()}</p>}
          </div>
        </div>
        {!token?<button
          className="login-btn"
          onClick={() => {
            setLogin(true);
          }}
        >
          Login
        </button>:<div className="nav-profile ">
          <img  src={assets.profile_icon} alt={assets.profile_icon} />
          
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/orderspage')}><img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          
        </div>}
        
        
      </div>
    </div>
  );
};

export default Navbar;
