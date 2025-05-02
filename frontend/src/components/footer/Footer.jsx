import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='contact'>
        <div className="footer-content">
    <div className="footer-left">
        <img src={assets.parota_logo} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae soluta odio sed modi at iusto nisi quia minus optio? Unde, aliquam! Consectetur adipisci ipsum aliquid nisi ad sunt dolorem sapiente!. </p>
        <div className="social">
        <img src={assets.facebook_icon} alt={assets.facebook_icon} />
        <img src={assets.linkedin_icon} alt={assets.linkedin_icon} />
        <img src={assets.twitter_icon} alt={assets.twitter_icon} />
        </div>
    </div>
    <div className="footer-middle">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact us</li>
        </ul>
    </div>
    <div className="footer-right">
        <h2>GET IN TOUCH</h2>
        <ul>
            <li><span>Email:</span> Parotta@ecom.com</li>
            <li><span>Phone:</span>+91-876543210</li>
        </ul>
    </div>
    </div>
    <hr />
    <p>Copyright &copy; 2025 Parotta.com - All rights reserved</p>
    </div>
  )
}

export default Footer