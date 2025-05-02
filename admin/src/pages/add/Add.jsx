import React, { useEffect } from 'react'
import './add.css'
import {assets}from '../../assets/assets'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Add = ({url}) => {
    
    const [image ,setImage]=useState(false);
    const [data,setData]=useState({
        productName:'',
        productDescription:'',
        catagory:'Salad',
        price:''
    })
   

    const onChangehandler=(e)=>{
        const name = e.target.name;
        const value=e.target.value;
        setData({...data,[name]:value})
    }
    const onsubmitHandler= async(event)=>{
        event.preventDefault()
        const fromdata = new FormData();
        fromdata.append('name',data.productName)
        fromdata.append('description',data.productDescription)
        fromdata.append('price',data.price)
        fromdata.append('category',data.catagory)
        fromdata.append('image',image)
        const responce=await axios.post(`${url}/api/food/add`,fromdata);
        if(responce.data.sucess){
            setData({
                productName:'',
                productDescription:'',
                catagory:'salad',
                price:''
            })
            setImage(false);
            toast.success(responce.data.message)
        }else{
            console.log(responce);
            toast.error(responce.data.message)
            

        }

    }




    useEffect(()=>{
        console.log(data);
    },[data])
  return (
    <div className="add">
        <form className='flex-col ' onSubmit={onsubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>upload image</p>
                <label className='image' htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt={assets.upload_area}  />
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required />
            </div>
            <div className="product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangehandler}  name='productName' value={data.productName} type="text" required placeholder='Product Name ' />
            </div>
            <div className="Product-Description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangehandler} name='productDescription' required value={data.productDescription} rows={6} placeholder='Write your content in here' ></textarea>
            </div>
            <div className="add-catagory-price ">
            <div className="Product-catagory flex-col">
                <p>Product catagory</p>
                <select onChange={onChangehandler} value={data.catagory}  required  name="catagory" >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    
                </select>
            </div>
            <div className="product_price flex-col">
                <p>Product Price</p>
                <input onChange={onChangehandler} name='price' value={data.price}  required type="number" placeholder='$20' />
            </div>
            </div>
            <button type='submit' className='add-btn' >Add </button>
        </form>
    </div>
  )
}

export default Add