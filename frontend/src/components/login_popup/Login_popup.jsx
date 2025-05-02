import React, { useEffect, useState } from 'react'
import './loginpopup.css'
import { assets } from '../../assets/assets'
import { storeContext } from '../../context/storecontext'
import { useContext } from 'react'
import axios from 'axios';

const Login_popup = ({setLogin}) => {
    const [currentstate, setstate] = useState('Log in')
    const {url, setToken}=useContext(storeContext);
    
    
    const [data ,setData] = useState({
        name:'',
        email:'',
        password:''
    })
    const onchangehandler=(e)=>{
        const name = e.target.name;
        const value=e.target.value;
        setData({...data,[name]:value})
    }

    

    const loginHandler = async(e)=>{
        e.preventDefault();
        let newUrl=url;
        if(currentstate ==='Log in'){
            newUrl=newUrl+'/api/user/login';
        }
        else{
            newUrl=newUrl+'/api/user/register';
        }
        
        const response = await axios.post(newUrl,data);
        if(response.data.Sucess){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token)
            setLogin(false);
            
        }
        
        else{
            alert(response.data.message);
        }

        
        
     }
  return (
    <div className="login_popup">
        <form onSubmit={loginHandler} className='login_popup_container'>
            <div className="popup_title">
                <h2>{currentstate}</h2>
                <img onClick={()=>setLogin(false)}src={assets.cross_icon} alt={assets.cross_icon} />
            </div>
            <div className="login_details">
                {currentstate === 'Sign up'?<input type="text" name='name' value={data.name} onChange={onchangehandler} required placeholder='Username' />:null}
                <input type="text" name='email'onChange={onchangehandler} value={data.email} required placeholder='Email' />
                <input type="password" name='password' onChange={onchangehandler} value={data.password} required placeholder='Password' />
                
                
            </div>
            <button type='submit'>{currentstate==='Sign up'?'Create Account':'Log in'}</button>
            <div className="login_condition">
                <input type="checkbox" required />
                <p>I agree to the terms and conditions of use.</p>
            </div>
            {currentstate === 'Sign up'?<p>Already have an account? <span onClick={()=>{setstate('Log in')}}>Log In</span></p>:<p>Don't have an account? <span onClick={()=>{setstate('Sign up')}}>Sgin up</span></p>}
        </form>
    </div>
  )
}

export default Login_popup