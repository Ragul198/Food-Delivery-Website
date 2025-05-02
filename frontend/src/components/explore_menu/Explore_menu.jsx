import React from 'react'
import './explore_menu.css'
import { menu_list } from '../../assets/assets'
const Explore_menu = ({catagory,setCatagory}) => {
    
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>explorem menu</h1>
        <p className='menu-desc'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita rerum ipsa, saepe excepturi fugit commodi vitae nobis hic est at cupiditate cumque sed maxime autem accusamus dignissimos incidunt id quam?</p>
        <div className="menu">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCatagory(prev=>prev===item.menu_name?"ALL":item.menu_name)} key={index} className="menu-item">
                        <img className={catagory===item.menu_name?"activemenu":""} src={item.menu_image}/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr className='line'/>
    </div>
  )
}

export default Explore_menu