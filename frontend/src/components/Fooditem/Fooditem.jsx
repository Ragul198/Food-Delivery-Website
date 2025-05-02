import React, { useContext, useState } from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import {storeContext} from '../../context/storecontext.jsx';

const Fooditem = ({id, name, price,description,image}) => {
    
  
  const {additem , removeitem , cartitem , url} = useContext(storeContext);
  
  return (
    
      <div className={"food_item" }>
        <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={image} /> 
          
           {!cartitem[id] ? <div className="add-icon">
          <img className=''onClick={()=>additem(id)} src={assets.add_icon_white} alt={assets.add_icon_white} />
          </div>  : <div className="added-counter">
              <img onClick={()=>removeitem(id)} src={assets.remove_icon_red} alt={assets.remove_icon_red} />
              <p>{cartitem[id]}</p>
              <img onClick={()=>additem(id)} src={assets.add_icon_green} alt={assets.add_icon_green} />
              </div>}
            

            
        </div>
        <div className="food_item_info">
          <div className="food-item-ratting">
          <p>{name}</p>
          <img src={assets.rating_starts} alt={assets.rating_starts} />
          </div>
          <p className='food-item-desc'>{description}</p>
          <p className='food-item-price'>${price}</p>
        </div>
      </div>
    
  )
}

export default Fooditem