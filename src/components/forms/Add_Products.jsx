import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Add_Products = () => {
  const [productName,setProductName]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState([])
  const [description,setDescription]=useState("")
  const [bestSeller,setBestSeller]=useState(false)
  const [image,setImage]=useState(null)

  const handleCategory=(e)=>{
    const value=e.target.value
    if(category.includes(value)){
      setCategory(category.filter((item)=> item!==value))
    }
    else{
      setCategory([...category,value])
    }
  }

  const handleBestSeller=(e)=>{
    const value=e.target.value==='true'
    setBestSeller(value)
    }
  

  const handleImage=(e)=>{
    const submittedImage=e.target.files[0]
    setImage(submittedImage)
  }

  const handleProductSubmit=async(e)=>{
    e.preventDefault()
    try {

      const loginToken=localStorage.getItem('loginToken')
      const firmId=localStorage.getItem('firmId')
      console.log(loginToken)
      console.log(firmId)

      if(! (loginToken|| firmId)){
        console.error("User is not Authenticated")
      }

      const formData=new FormData()
      formData.append('productName',productName)
      formData.append('price',price)
      formData.append('description',description)
      category.forEach((item)=>{
        formData.append('category',item)
      })
      formData.append('image',image)
      const response=await fetch(`${API_URL}/products/addProduct/${firmId}`,{
        method:'POST',
        body: formData
      })

      const data=await response.json()
      
      if(response.ok){
        console.log(data)
        alert("Product added Successfully")
        setProductName("")
        setPrice("")
        setCategory([])
        setDescription("")
        setBestSeller(false)
        setImage(null)
      }
    }  
    catch (error) {
      console.error(error)
      alert("Falied to add the product")
    }
  }


  return (
    <div className='productSection'>

        <form className='productTableForm' onSubmit={handleProductSubmit}>
        <h3>Add Product</h3>
                <label>Product Name: </label>
                <input type='text' name='productName' value={productName} onChange={(e)=>setProductName(e.target.value)} placeholder='Enter Your Product Name'/><br/>
                <label>Price: </label>
                <input type='text' name='price' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter Price'/><br/>
                <div className="checkBoxContainer">
                  <label>Category: </label><br/>
                  <div className="checkBoxProdValues">
                  <input type='checkbox' checked={category.includes('Veg')} onChange={handleCategory} value="Veg"/>
                  <label>Veg</label>
                  <input type='checkbox' checked={category.includes('Non-veg')} onChange={handleCategory} value="Non-veg"/>
                  <label>Non-veg</label>
                  </div>
                </div><br/>
                <label>Description: </label>
                <input type='text' name='description' onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='Add Description'/><br/>
                <div className="radioBoxContainer">
                  <label>BestSeller: </label><br/>
                  <div className="radioBoxProdValues">
                  <input type='radio' value="true" onChange={handleBestSeller} checked={bestSeller===true}/>
                  <label>Yes</label>
                  <input type='radio' value="false" onChange={handleBestSeller} checked={bestSeller===false} />
                  <label>No</label>
                  </div>
                </div><br/>
                <label>Product Image: </label>
                <input type='file' onChange={handleImage}/><br/>
                <button type='submit' className='btnSubmit'>Submit</button>
        </form>
      
    </div>
  )
}

export default Add_Products
