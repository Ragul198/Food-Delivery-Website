import React, { useContext, useEffect, useState } from "react";
import "./Place_order.css";
import { storeContext } from "../../context/storecontext";
import axios from "axios";
import { useNavigate } from "react-router";
const Placer_order = () => {
  const { cart_total_price, food_list, cartitem, totalprice, url, token } =
    useContext(storeContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const Placer_Order = async (e) => {
    e.preventDefault();
    let order_items = [];
    food_list.map((item) => {
      if (cartitem[item._id] > 0) {
        let iteminfo = item;
        iteminfo["quantity"] = cartitem[item._id];
        order_items.push(iteminfo);
      }
    });
    let orderData = {
      address: formData,
      items: order_items,
      amount: cart_total_price() + 2,
    };
    console.log(orderData);
    try {
      const response = await axios.post(
        `${url}/api/order/placeorder`,
        orderData,
        { headers: { token } }
      );
      if (!response.data.success) {
        alert("Failed to initiate order");
      }
      const OderID = response.data.orderId;
      console.log(response.data.orderId);
      const options = {
        key: "rzp_test_UrK8hjLuiLiZ5f", // replace with your test key
        amount: orderData.amount * 100,
        currency: "INR",
        name: "Food Delivery App",
        description: "Payment for Order",
        order_id: response.data.razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${url}/api/order/verifyPayment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderId: OderID,
              }
            );
            console.log(verifyRes.data);
            if (verifyRes.data.success) {
              window.location.href = `/ordersuccess?success=true&orderId=${OderID}`;
            } else {
              alert("Payment failed");
              window.location.href = `/ordersuccess?success=false&orderId=${OderID}`;
            }
          } catch (err) {
            console.error("Payment verification failed", err);
          }
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order placement failed", err);
      alert("Something went wrong");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate("/cart");
      setTimeout(() => {
        alert("Please login to view your orders.");
      }, 500);
    }
  }, [token]);

  return (
    <form className="form" onSubmit={Placer_Order}>
      <div className="left-form">
        <h2>Shipping Information</h2>
        <div className="two">
          <input
            type="text"
            onChange={onchangeHandler}
            required
            name="firstname"
            value={formData.firstname}
            placeholder="FIRST NAME"
          />
          <input
            type="text"
            onChange={onchangeHandler}
            required
            name="lastname"
            value={formData.lastname}
            placeholder="LAST NAME"
          />
        </div>
        <input
          type="email"
          onChange={onchangeHandler}
          required
          name="email"
          value={formData.email}
          placeholder="Email Address"
        />
        <input
          type="text"
          onChange={onchangeHandler}
          required
          name="street"
          value={formData.street}
          placeholder="Street"
        />
        <div className="two">
          <input
            type="text"
            onChange={onchangeHandler}
            required
            name="city"
            value={formData.city}
            placeholder="City"
          />
          <input
            type="text"
            onChange={onchangeHandler}
            required
            name="state"
            value={formData.state}
            placeholder="State"
          />
        </div>
        <div className="two">
          <input
            type="number"
            onChange={onchangeHandler}
            required
            name="zipCode"
            value={formData.zipCode}
            placeholder="Zip Code"
          />
          <input
            type="text"
            onChange={onchangeHandler}
            required
            name="country"
            value={formData.country}
            placeholder="Country"
          />
        </div>
        <input
          type="phone"
          onChange={onchangeHandler}
          required
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Phone Number"
        />
      </div>
      <div className="right-form">
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
              <p>${!cart_total_price() ? "0" : "2"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${!cart_total_price() ? "0" : cart_total_price() + 2}</b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default Placer_order;
