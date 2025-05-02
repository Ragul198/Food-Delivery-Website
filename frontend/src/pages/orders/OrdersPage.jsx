import React from 'react'
import './order.css'
import {storeContext} from '../../context/storecontext';
import { useState,useEffect,useContext} from "react";
import axios from 'axios';
import { assets } from '../../assets/assets';
const OrdersPage = () => {

    const [ordersData,setOrdersData]=useState([])
    const {  url, token } =
        useContext(storeContext);
   
    const getOrders=async()=>{
        try {
            const response = await axios.post(`${url}/api/order/userOrders`,{},{headers:{token}});
            console.log(response.data.data);
            setOrdersData(response.data.data);
            
        }catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (!token) return; // Wait until token is available
        const fetch = async () => {
          await getOrders();
        };
        fetch();
      }, [token]); // depend on token
      
  return (
    <div className='my_orders'>
        <h2>My Orders</h2>
        <div className="order-container">
        {ordersData.map((order, index)=>{
            return(
            <div className='my-orders-order' key={index}>
                <img src={assets.parcel_icon } alt={assets.parcel_icon } />
                <p>{order.items.map((item,index)=>{
                    
                   
                    if(index===order.items.length-1){
                        return item.name+" x"+item.quantity;
                    }
                    else{
                        return item.name+" x"+item.quantity+", ";
                    }

                })}</p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button onClick={getOrders}>Track Order</button>

                
            </div>
        )
        })}
        </div>
    </div>
  )
}

export default OrdersPage