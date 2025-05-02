import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import Explore_menu from '../../components/explore_menu/Explore_menu'
import Food_display from '../../components/food_display/Food_display'
import App_download from '../../components/app_download/App_download'


const Home = () => {
  const[catagory,setCatagory]=useState('ALL')
  return (
    <div>
      <Header />
      <Explore_menu catagory={catagory} setCatagory={setCatagory} />  
      <Food_display catagory={catagory}></Food_display>
      <App_download></App_download>
      

    </div>
  )
}

export default Home