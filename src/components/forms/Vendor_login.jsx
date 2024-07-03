import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Vendor_login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const loginHandler=async (e)=>{
    
    e.preventDefault()
    try{
    const response=await fetch(`${API_URL}/vendor/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password})
    })

    const data=await response.json();
    if(response.ok){
      console.log(data)
      alert("Vendor Login Successfully")
      setEmail("")
      setPassword("")
      localStorage.setItem("loginToken",data.token)
      showWelcomeHandler()
    }
    const vendorId=data.vendorId
    const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
    const vendorData=await vendorResponse.json()
    console.log(vendorData)
    if(vendorResponse.ok){
      const vendorFirmId=vendorData.vendorFirmId
      const vendorFirmName=vendorData.vendorFirmName
    
      // localStorage.setItem("firmId",vendorFirmId)
      // localStorage.setItem("firmName",vendorFirmName)
      if (vendorFirmId && vendorFirmName) {
        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmName);
      } else {
        alert("Please add your firm details.");
      }
      window.location.reload()
      
    }
  }
  catch(error){
    console.log(error)
    alert("Vendor failed to login")
  }
  }


  return (
    <div className="loginContainer">
            <form className='authForm' onSubmit={loginHandler}>
                <h3>Vendor Login</h3>
                <label>Email: </label>
                <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/><br/>
                <label>Password: </label>
                <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/><br/>
                <button type='submit' className='btnSubmit'>Submit</button>

            </form>

    </div>
  )
}

export default Vendor_login
