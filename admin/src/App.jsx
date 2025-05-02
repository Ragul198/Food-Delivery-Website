import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Order from './pages/order/Order'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
const App = () => {
  const url ="http://localhost:4000";
  return (
    <>
    <div>
      <ToastContainer />
    <Navbar/>
    <hr />
    <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route  path="/add" element={<Add url={url}/>}></Route>
        <Route  path="/list" element={<List url={url}/>}></Route>
        <Route  path="/order" element={<Order url={url}/>}></Route>
      </Routes>
    </div>

    </div>
    </>
  )
}

export default App