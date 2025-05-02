import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list,setlist] =useState([]);
  

  const fetchlist=async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    
    if(response.data.success){
      setlist(response.data.data);
      
    }
    else{
      toast.error(response.data.message);
    }
     
   
  }
 

  const removefood = async(_id)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:_id});
    await fetchlist();
    if(response.data.success){
      toast.info(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
    }
   
  useEffect(()=>{
    fetchlist();
  },[])
  

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Catagory</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        
        {list.map((item,index)=>{
          return(
            <div className="list-table-format item" key={index}>
              <img src={`${url}/images/${item.image}`} alt="image" />
              {console.log(`${url}/images/${item.image}`)}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removefood(item._id)} className='cursor-pointer'>X</p>
            </div>
         
         )})}
        
        
      </div>
    </div>
  )
}

export default List