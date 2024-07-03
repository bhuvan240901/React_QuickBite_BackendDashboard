import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Vendor_register = ({showLoginHandler}) => {

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      })

      const data=await response.json()

      if(response.ok){
        console.log(data)
        setUsername("")
        setEmail("")
        setPassword("")
        alert("Vendor Registered Successfully")
        showLoginHandler()
        
      }
      
    } catch (error) {
      console.log("Registration Failed:",error)
      alert("Vendor is Failed to Register")
    }
  }

  return (
    <div className='registerSection'>
            <form className='authForm' onSubmit={handleSubmit}>
                <h3>Vendor Register</h3>
                <label>Username: </label>
                <input type='text' name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your Username'/><br/>
                <label>Email: </label>
                <input type='text' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/><br/>
                <label>Password: </label>
                <input type='password' name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/><br/>
                <button type='submit' className='btnSubmit'>Submit</button>
            </form>
      
    </div>
  )
}

export default Vendor_register
