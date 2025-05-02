import React from 'react'
import './order.css'
import { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({url}) => {

  const [OrderList,setOrderList]=useState([]);
  

  const getOrders=async()=>{
    try{
     const response = await axios.get(`${url}/api/order/list`)
     console.log(response);
      setOrderList(response.data.data);
    }
    catch(err){
        toast.error("error",err);
    }
  
  }

  const statusHandler=async(e,order_id)=>{
    const value=e.target.value;
    const response= await axios.post(`${url}/api/order/status/`,{orderId:order_id,status:value});
    console.log(response);
    if(response.data.success){
      toast.success('Status Updated');
      await getOrders();

    }else{
      toast.error('Error Updating Status');
    }
  }

  useEffect(()=>{
   getOrders();
  },[])
  return (
    <div className='Orders-list add flex-col'>
      <h1>Orders</h1>
      <div className="orders-container">
        {OrderList.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-items-food'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name+" X"+item.quantity;
                  }
                  else{
                    return item.name+" X"+item.quantity+", ";
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.firstname+" "+order.address.lastname}
              </p>
              <div className="order-item-adress">
                <p>{order.address.street+" ,"}</p>
                <p>{order.address.city+" ,"+order.address.state+" ,"+order.address.country+" ,"+order.address.zipCode}</p>
              </div>
              <p className='oder-item-phone'>{order.address.phoneNumber}</p>
            </div>
            <p>items:{order.items.length}</p>
            <p>total: ${order.amount}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} >
              <option value="Food processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Order