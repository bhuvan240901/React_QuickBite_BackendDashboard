import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Vendor_login from '../components/forms/Vendor_login'
import Vendor_register from '../components/forms/Vendor_register'
import Add_Firm from '../components/forms/Add_Firm'
import Add_Products from '../components/forms/Add_Products'
import Welcome from '../components/Welcome'
import All_Products from '../components/All_Products'


const LandingPage = () => {

  const [showLogin,setShowLogin]=useState(false)
  const [showRegister,setShowRegister]=useState(false)
  const [showFirm,setShowFirm]=useState(false)
  const [showProduct,setShowProduct]=useState(false)
  const [showWelcome,setShowWelcome]=useState(false)
  const [showAllProducts,setShowAllProducts]=useState(false)
  const [showLogout,setShowLogout]=useState(false)
  const [showFirmTitle,setShowFirmTitle]=useState(true)

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogout(true)
    }

  },[])

  useEffect(()=>{

    const firmName=localStorage.getItem('firmName')
    if(firmName){
      setShowFirmTitle(false)
    }

  },[])

  const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmHandler=()=>{
    if(showLogout){
    setShowFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    }
    else{
      alert("Please Login!!!")
      setShowLogin(true)
    }
  }

  const showProductHandler=()=>{
    if(showLogout){
    setShowProduct(true)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
    else{
      alert("Please Login!!!")
      setShowLogin(true)
    }
  }

  const showWelcomeHandler=()=>{
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(true)
    setShowAllProducts(false)
  }

  const showAllProductsHandler=()=>{
    if(showLogout){
    setShowAllProducts(true)
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
  }
    else{
      alert("Please Login!!!")
      setShowLogin(true)
    }
  }

  const showLogoutHandler=()=>{
    confirm("Are you sure, want to logout?")
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName')
    setShowLogout(false)
    alert("Logout Successfully")
    setShowFirmTitle(true)
    

  }
  return (
   
      <>
      <section>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} 
        showLogoutHandler={showLogoutHandler} showLogout={showLogout}/>
        <div className="containerComponents">
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} 
        showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
        {showLogin && <Vendor_login showWelcomeHandler={showWelcomeHandler}/>}
        {showRegister && <Vendor_register showLoginHandler={showLoginHandler}/>}
        {showFirm && showLogout && <Add_Firm />}
        {showProduct && showLogout && <Add_Products/>}
        {showWelcome && <Welcome/>}
        {showAllProducts && showLogout && <All_Products/>}
        </div>
        
      </section>
      </>
   
  )
}

export default LandingPage
