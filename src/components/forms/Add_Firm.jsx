import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const Add_Firm = () => {
  const [firmName,setFirmName]=useState("")
  const [area,setArea]=useState("")
  const [category,setCategory]=useState([])
  const [region,setRegion]=useState([])
  const [offer,setOffer]=useState("")
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

  const handleRegion=(e)=>{
    const value=e.target.value
    if(region.includes(value)){
      setRegion(region.filter((item)=> item!==value))
    }
    else{
      setRegion([...region,value])
    }

  }

  const handleImage=(e)=>{
    const imageSelected = e.target.files[0]
    setImage(imageSelected)
  }


  const handleFirmSubmit=async (e)=>{
    e.preventDefault()
    try {

      const loginToken=localStorage.getItem('loginToken')

      if(!loginToken){
        console.error("User not Authenticated")
      }

      const formData=new FormData()
      formData.append('firmName',firmName)
      formData.append('area',area)
      formData.append('offer',offer)
      category.forEach((value)=>{
        formData.append('category',value)
      })
      region.forEach((value)=>{
        formData.append('region',value)
      })
      formData.append('image',image)


      const response=await fetch(`${API_URL}/firms/add-firm`,{
        method:'POST',
        headers:{
          token:`${loginToken}`
        },
        body:formData
      })

      const data=await response.json()
      if(response.ok){
        console.log(data)
        alert("Firm added successfully")
        setFirmName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffer("")
        setImage(null)
      }
      else if(data.message === "Vendor can add only one firm."){
          alert("Firm already Exists!! Only one firm can be added.")
          localStorage.setItem('firmId', data.firmId);
      }
      else{
          alert("Failed to add Firm.")
      }
      const firmId=data.firmId
      localStorage.setItem('firmId',firmId)
      console.log(data.firmId)

      
    } catch (error) {
      console.log(error)
      alert("Failed to add firm")
    }
  }

  return (
    <div className='firmSection'>
        <form className='tableForm' onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
                <label>Firm Name: </label>
                <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} placeholder='Enter Your Firm Name'/><br/>
                <label>Area: </label>
                <input type='text'name='area' value={area} onChange={(e)=>setArea(e.target.value)} placeholder='Enter Area'/><br/>
                <div className="checkBoxContainer">
                  <label>Category: </label><br/>
                  <div className="checkBoxValues">
                  <input type='checkbox' checked={category.includes('Veg')} onChange={handleCategory} value="Veg"/>
                  <label>Veg</label>
                  <input type='checkbox' checked={category.includes('Non-veg')} onChange={handleCategory} value="Non-veg"/>
                  <label>Non-veg</label>
                  </div>
                </div><br/>
                <div className="checkBoxContainer">
                  <label>Region: </label><br/>
                  <div className="checkBoxValues">
                  <input type='checkbox' checked={region.includes('north-indian')} onChange={handleRegion} value="north-indian"/>
                  <label>North-Indian </label>
                  <input type='checkbox' checked={region.includes('south-indian')} onChange={handleRegion} value="south-indian"/>
                  <label>South-Indian</label>
                  <input type='checkbox' checked={region.includes('chinese')} onChange={handleRegion} value="chinese"/>
                  <label>Chinese </label>
                  <input type='checkbox' checked={region.includes('bakery')} onChange={handleRegion} value="bakery"/>
                  <label>Bakery </label>
                  </div>
                </div><br/>
                <label>Offer: </label>
                <input type='text' name='offer' value={offer}  onChange={(e)=>setOffer(e.target.value)} placeholder='Offer'/><br/>
                <label>Firm Image: </label>
                <input type='file' onChange={handleImage}/><br/>
                <button type='submit' className='btnSubmit'>Submit</button>
        </form>
      
    </div>
  )
}

export default Add_Firm
