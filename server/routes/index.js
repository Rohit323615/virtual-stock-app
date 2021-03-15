const express=require('express')
const router=express.Router()
const Stock=require('../model/Stock')

router.get('/',async (req,res)=>{
    const suc=await Stock.find()
    res.json(suc)
})

router.get('/:name',async (req,res)=>{
    const name=req.params.name
    const exist=await Stock.find({stockName:name})
    res.json(exist)
   
})


router.put('/:name',async (req,res)=>{
    const name=req.params.name
    const unit=req.body.stockQuantity
    const suc=await Stock.updateOne({stockName:name},{$set:{stockQuantity:unit}})
    res.json(suc)
})


router.delete('/:name',async (req,res)=>{
    const name=req.params.name
    const suc=await Stock.deleteOne({stockName:name})
    res.json(suc)
})

router.post('/',async (req,res)=>{
const {stockName,stockQuantity,price}=req.body

const share=Stock.findOne({stockName:stockName})
const stock=new Stock({
    stockName,
    stockQuantity,
    price
})
const suc=await stock.save()
res.json(suc)

})

module.exports=router