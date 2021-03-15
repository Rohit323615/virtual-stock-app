const mongoose=require('mongoose')

const stockSchema=mongoose.Schema({
    stockName:{
        type:String,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        Default:Date.now()
    }
})


module.exports=mongoose.model('stock',stockSchema)