import {useState,useEffect} from 'react'
import axios from 'axios'
import Share from './Share'

const Portfolio = () => {
  const [stockData,setStockData]=useState('')


  useEffect(()=>{
      axios.get('http://localhost:5000/')
      .then((res)=>setStockData(res.data))
      .catch((err)=>console.log(err))

  })
   
  if(stockData.length===0)
  {
      return <h2>no data </h2>
  }
  else{
    return (
        <div>
           {stockData.map((share)=>(<Share key={share._id} share={share}/>))}
        </div>
    )
  }
}

export default Portfolio
