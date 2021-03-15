import {useState} from 'react'
import {Grid,Paper,Typography,Button,TextField} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const Stock = ({data}) => {
    let history=useHistory()
    const [stockQuantity,setStockQuantity]=useState('')

     if(!data)return (<>
         <Typography>No data to show ...</Typography>
         </>
     )

  

     const handleChange=(e)=>{
         setStockQuantity(e.target.value)
     }

     const handleBuy= async ()=>{
         const stockExist=await axios.get(`http://localhost:5000/${data[0].name}`)
        //  console.log(stockExist)

         if(stockExist.data.length===0){

      const success= await axios.post('http://localhost:5000/', {
           stockName: data[0].name,
           stockQuantity:stockQuantity,
           price:data[0].price
         })

         }
          else{
             const unit=parseInt(stockExist.data[0].stockQuantity)+parseInt(stockQuantity)
           const success=await axios.put(`http://localhost:5000/${data[0].name}`,{stockQuantity:unit})
           console.log(success)

         }
        
         history.push('/portfolio')
     }

     const handleSell= async ()=>{
        const stockExist=await axios.get(`http://localhost:5000/${data[0].name}`)

       const a=parseInt(stockQuantity)
       const b=parseInt(stockExist.data[0].stockQuantity)


        if(a<b){
            const unit=parseInt(stockExist.data[0].stockQuantity)-parseInt(stockQuantity)
           const success=await axios.put(`http://localhost:5000/${data[0].name}`,{stockQuantity:unit})
           console.log(success)
        }
        else if(a===b){
            const success=await axios.delete(`http://localhost:5000/${data[0].name}`)
            console.log(success)
        }
        history.push('/portfolio')
     }

    return (
        <>
            <Paper elevation={6} style={{width:'500px',height:'300px',margin:'100px auto'}}>
                <Grid container>
                <Grid item style={{margin:'10px 10px'}} xs={12} sm={12}>
                <Typography variant='h5'>Compnay Name: {data[0].name}</Typography>
                <Typography variant='h5'>Symbol: {data[0].symbol}</Typography>
                <Typography variant='h5'>Price: {data[0].price}$</Typography>
                <Typography variant='h5'>dayHigh: {data[0].dayHigh}$</Typography>
                <Typography variant='h5'>dayLow: {data[0].dayLow}$</Typography>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                    <TextField label='quantity' placeholder='quantity' variant='outlined' onChange={handleChange}/>
                        <Button  variant='outlined' color='primary' style={{margin:'10px 20px'}}  onClick={handleBuy} >Buy</Button>
                        <Button  variant='outlined' color='primary' style={{margin:'10px 20px'}} onClick={handleSell} >Sell</Button>
                </Grid>

                </Grid>
            </Paper>
        </>
    )
}

export default Stock
