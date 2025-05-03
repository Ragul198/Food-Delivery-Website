import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/cart/Cart";
import Place_order from "./pages/Place-order/Placer_order";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import Login_popup from "./components/login_popup/Login_popup";
import Payment from "./pages/sucess_failuer/Payment";
import OrdersPage from "./pages/orders/OrdersPage";
function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      {login? <Login_popup setLogin={setLogin} />:<></>}
      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place_order" element={<Place_order />} />
          <Route path="/ordersuccess" element={<Payment />} />
          <Route path="/orderspage" element={<OrdersPage />} />
          
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
