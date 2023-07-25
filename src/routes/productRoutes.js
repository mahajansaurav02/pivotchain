const express=require("express")
const router=express.Router()
const {createProduct, getProducts}=require("../controller/productController")

router.post('/createProduct',createProduct)
router.get('/getProducts',getProducts)





module.exports=router