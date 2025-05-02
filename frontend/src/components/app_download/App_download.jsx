import React from 'react'
import './app_download.css'
import { assets } from '../../assets/assets'
const App_download = () => {
  return (
    <div className="app_downlaod" id='download'>
        <p>For Better experience Download <br /> Parotta app</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />  
        </div>
    </div>
  )
}

export default App_download