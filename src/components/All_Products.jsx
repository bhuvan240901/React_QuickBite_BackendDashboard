import React, { useEffect, useState } from 'react'
import {API_URL} from '../data/apiPath.js'

const All_Products = () => {
  const [showProducts,setShowProducts]=useState([])

  const showProductsHandler=async()=>{
    const firmId=localStorage.getItem("firmId")
    try {
      
    const response=await fetch(`${API_URL}/products/${firmId}/products`)
    const responseData= await response.json()
    setShowProducts(responseData.products)
    console.log(responseData)
    } catch (error) {
      console.log(error)
      alert("Failed to fetch products.")
    }
    
  }

  useEffect(()=>{
    showProductsHandler()
  },[])

  const deleteProductByID=async (productId)=>{

    try {
      const response=await fetch(`${API_URL}/products/${productId}`,{
        method:'DELETE'
      })
      if(response.ok){
        setShowProducts(showProducts.filter(product=>product._id!==productId))
        confirm("Are you sure, want to delete this product?")
        alert("Product deleted Successfully")
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product")
    }
  }
  

  return (
    <div>
      {!showProducts?(
        <p>No Products added</p>
      ):(

        <table className='productTable'>
          <thead>
              <tr>

                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
          </thead>
          <tbody>

            {showProducts.map((item)=>{
              return (
                <>
                
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.image && (<img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} 
                    style={{height:'100px',width:'200px'}}/>)}
                  </td>
                  <td><button onClick={()=>deleteProductByID(item._id)}>Delete</button></td>

                </tr>
                
                </>

              )
            })
            }
          </tbody>

        </table>
      )}
    </div>
  )
}

export default All_Products
