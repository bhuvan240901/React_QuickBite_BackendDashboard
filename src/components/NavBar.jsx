import React from 'react'


const NavBar = ({showLoginHandler,showRegisterHandler,showLogoutHandler,showLogout}) => {
  const firmName=localStorage.getItem("firmName")
  return (
    <div className='navSection'>

      <div className="company">
          Vendor Dashboard
      </div>
      <div className="firmName">
        {firmName}
      </div>
      <div className="userAuth">
        {!showLogout?
        <>
        <span onClick={showLoginHandler}>Login /</span>
        <span onClick={showRegisterHandler}> Register</span>
        </>:
        <span onClick={showLogoutHandler}>Logout</span>
        }
      </div>
    </div>
  )
}

export default NavBar
