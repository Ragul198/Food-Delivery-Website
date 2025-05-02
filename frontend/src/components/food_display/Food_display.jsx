import React, { useContext } from 'react'
import './food_display.css'
import {storeContext} from '../../context/storecontext';
import Fooditem from '../Fooditem/Fooditem';
const Food_display = ({catagory}) => {

    const {food_list} = useContext(storeContext);
    
    
  return (
      <div className='food-display'>
        <h2>Your Food picks are here</h2>
      <div className="food_display_list">
        {food_list.map((item,index)=>{
          if(catagory==='ALL' || catagory===item.category){
            return(
              
              <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}  ></Fooditem>
          ) 
          }
            
        })}
      </div>
      </div>
  )
}

export default Food_display