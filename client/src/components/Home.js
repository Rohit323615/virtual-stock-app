
import {Container,Button,Paper,Grid,TextField} from '@material-ui/core'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Autocomplete} from '@material-ui/lab'
import {useHistory} from 'react-router-dom'


const Home = ({setData}) => {
    let history=useHistory()
  const [stockName,setStockName] =useState('')
  const [allStocks,setAllStocks]=useState([])

  useEffect(()=>{
     axios.get('https://financialmodelingprep.com/api/v3/stock/list?apikey=e8c2679ee6a6eab1f4d1aefaae6dad31')
     .then((res)=>setAllStocks(res.data.slice(0,1000)))
     .catch((err)=>console.log(err))
  },[])



const handleSubmit=(e)=>{
    e.preventDefault()
    axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockName}?apikey=e8c2679ee6a6eab1f4d1aefaae6dad31`)
    .then((res)=>setData(res.data))
    .catch((err)=>console.log(err))
    history.push('/stock')
}


    return (
        <>
            <Container>
           
                <Paper elevation={6} style={{height:'200px',width:'500px',margin:'150px auto'}}>
                    <form onSubmit={handleSubmit}>

                     <Grid container>
                        <Grid item xs={12} sm={12} >  

                         <Autocomplete
                             id="stock-box-demo"
                            options={allStocks}
                            getOptionLabel={(option) => option.symbol}
                             renderOption={(option)=>(
                                 <>{option.name} ({option.symbol})</> )}
                                   
                            style={{ width: '100%'}}
                            onChange={(event, newValue) => {
                                if(newValue)
                                setStockName(newValue.symbol);
                              }}
                            renderInput={(params) => <TextField {...params}  label="stock box" variant="outlined" style={{marginTop:'20px'}}   />}
                            
                             />

                            <Button variant='contained' type='submit' color='primary' style={{margin:'20px 170px',padding:'10px 40px'}} >Search</Button>

                        </Grid>
                     </Grid>

                     </form>
                </Paper>
            </Container>
        </>
    )
}

export default Home
