import React, { useEffect } from "react";
import "./Cart.css";
import { storeContext } from "../../context/storecontext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Cart = () => {
  const { food_list, clearitem, removeitem, cartitem ,cart_total_price ,url,token } =
    useContext(storeContext);
    const navigate=useNavigate();
    
  return (
    <div className="cart">
      <div className="cartitems">
        <div className="cart_item_title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitem[item._id] > 0) {
            return (
              <div className="div" key={index}>
                <div className="cart_items-item cart_item_title" key={index}>
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartitem[item._id]}</p>
                  <p>${item.price * cartitem[item._id]}</p>
                  <p className="cross" onClick={() => removeitem(item._id)}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart_bottom">
        <div className="cart-Total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${cart_total_price()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${!cart_total_price()?'0':'2'}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${!cart_total_price()?'0':cart_total_price()+2}</b>
            </div>
            
          </div>
          <button onClick={()=>!cart_total_price()?alert('Add Item in your cart'):navigate('/place_order')}>Proceed to Payment</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have Promp code enter here !</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
