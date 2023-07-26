const express=require("express")
const router=express.Router()
const {createProduct, getProducts, deleteProduct, updateProduct}=require("../controller/productController")

router.post('/createProduct',createProduct)
router.get('/getProducts',getProducts)
router.put('/updateP/:id',updateProduct)
router.delete('/deleteP/:id',deleteProduct)





module.exports=router