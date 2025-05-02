import React, { useEffect } from 'react'
import './payment.css'
import {useState} from "react";
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
const Payment = () => {
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    
  
    useEffect(() => {
      window.scrollTo(0, 0);
  
      // Start fade-out after 4.5s, then hide spinner at 5s
     
      const loaderTimer = setTimeout(() => setLoading(false), 5000);
  
      return () => {
        
        clearTimeout(loaderTimer);
      };
    }, []);
  
    return (
      <div className="container">
      <div className='sucess'>
        {loading ? (
          <span className={`loader `}></span>
        ) : (
          <div className='success-message fade-in'>
            <h1>{success === 'true' ? 'Payment Successful!' : 'Payment Failed!'}</h1>
            <h2>{success === 'true' ? 'Your order has been placed successfully.' : 'There was an error processing your payment.'}</h2>
            <h3>{success === 'true' ? 'Thanks For Shopping with us!' : 'Please try again later or contact support for assistance.'}</h3>
            <p className='order-id'>Order ID: {orderId}</p>
            <div className="navlink">
              <Link to="/">Go to Home</Link>
              <Link to="/orderspage">View Orders</Link>
            </div>
          </div>
        )}
      </div>
      </div>
    );
}

export default Payment