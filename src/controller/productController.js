const productModel=require('../models/productModel')

const createProduct=async(req,res)=>{

    let {title,description,productImage,price}=req.body

    try {
if(!title){return res.status(400).json({message:"Product title required"})}
const checkProduct=await productModel.find({title:title})
if(checkProduct){return res.status(400).json({message:"Product title is already available"})}
if(!description){return res.status(400).json({message:"description title required"})}
if(!productImage){return res.status(400).json({message:"productImage title required"})}
if(!price){return res.status(400).json({message:"price title required"})}

let createProduct=await productModel.create(req.body)

return res.status(201).json({message:"Product Created Successfully",data:createProduct})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }

}



const getProducts=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({message:error.message})

    }
}
module.exports={createProduct}