const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv/config')

mongoose.connect(process.env.MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log('mongodb connected...'))

const app=express()

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/',require('./routes/index'))
app.use('/user',require('./routes/user'))

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server started on port ${PORT}`))