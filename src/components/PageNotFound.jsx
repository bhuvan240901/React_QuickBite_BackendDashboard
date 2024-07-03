import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='notfound'>
      <h1>404 Page Not Found</h1>
      <Link to='/'>Go Back</Link>
    </div>
  )
}

export default PageNotFound
