import React, { useState } from 'react'
import axios from "axios"
import Loading from "./Loading"
import "../index.css"

const Giphy = () => {
  const [data,setData] =useState([])
  const [search ,setSearch] =useState("")
  const [isLoding,setIsLoding] =useState(false)


  const getGifs =() =>{
    if (isLoding) {
      return <Loading />
    }
    return data.map(el =>{
      return (
        <div key={el.id} className='gif'>
          <img src={el.images.fixed_height.url} alt=""/>
        </div>
      )
    })
  } 

  const handleSearchChange = event =>{
    setSearch(event.target.value)
  };

  const searchGif = async event =>{
    event.preventDefault();
    setIsLoding(true);

    try{
      const results = await axios("http://api.giphy.com/v1/gifs/search" ,{
        params:{
          api_key:"wQmOPslZoBFVp5ZrOVxYiaQfTKrXojY4",
            q: search,
            limit:50
        }
        
      })
      setData(results.data.data);
    }catch(err){
      console.log("Error")
    }
      setIsLoding(false)
  }

  return (
    <div className='m-2 '>
      
      <form className='d-flex justify-content-around align-items-center w-50 m-auto '>
        
        <input type="text"
        className='form-control'
        value={search}
        id="input" 
        placeholder='Type Keyword For 👾GIF Search'
        onChange={handleSearchChange} 
      />
      <button 
        onClick={searchGif} 
        type="submit" 
        className='btn btn-primary mx-2'
      >
        Search
      </button>
      </form>
      <div className='container gifs'>{getGifs()}</div>
    </div>
  ) 
}

export default Giphy