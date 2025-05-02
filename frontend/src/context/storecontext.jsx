import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";


export const storeContext = createContext(null);

const Store_context_provider = (props) => {
  const [cartitem, setCartitem] = useState({});
  const [token,setToken]=useState('');
  const [food_list ,setFoodlist] = useState([])


  const url ='http://localhost:4000';
 

  const foodlist = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setFoodlist(response.data.data)
    }
    else{
      console.log(response.data.message)
    }
  }


  const additem = async (item) => {
    if (!cartitem[item]) {
      setCartitem((prev) => ({ ...prev, [item]: 1 }));
    } else {
      setCartitem((prev) => ({ ...prev, [item]: prev[item] + 1 }));
    }
    if(token){
      await axios.post(`${url}/api/cart/add`,{item},{headers:{token}});
    }
   

      
    
  };
  const removeitem = async (item) => {
    setCartitem((prev) => ({ ...prev, [item]: prev[item] - 1 }));
    if(token){
      await axios.post(`${url}/api/cart/remove`,{item},{headers:{token}});
    }
  };
  const getcart = async(token)=>{
    const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
    setCartitem(response.data.data);
    
    
  }
  const clearitem = (item) => {
    setCartitem((prev) => ({ ...prev, [item]: 0 }));
  };
  const clearcart = async ()=>{
    setCartitem({})
    await axios.delete(`${url}/api/cart/clear`,{headers:{token}})
  }
  const cart_total_price = () => {
    let totalprice = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        let item_info = food_list.find((food) => food._id === item);
        totalprice += item_info.price * cartitem[item];
      }
      
    }
    return totalprice;
  };

  const cart_item_count = () => {
    let count = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        count++;
      }
    }
    return count;
  };
  const contextvalue = {
    food_list,
    additem,
    removeitem,
    setCartitem,
    cartitem,
    clearitem,
    cart_total_price,
    cart_item_count,
    url,
    setToken,
    token,
    
  };
  useEffect(() => {
    async function loadfood() {
      await foodlist();

    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      await getcart(localStorage.getItem('token'));
      }
    }
   
    loadfood();
    
  }, [token]);
  
  return (
    <storeContext.Provider value={contextvalue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default Store_context_provider;
