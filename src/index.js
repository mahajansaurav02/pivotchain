const express=require("express")
const mongoose=require("mongoose")
const app=express()
const PORT=5000
const route=require("./routes/productRoutes")

app.use(express.json())



mongoose.connect("mongodb+srv://sauravmahajan2007:VtQrNsNLrQPgIreS@cluster0.fno6qas.mongodb.net/mydatabase",
   {useNewUrlParser : true}
)
.then(()=>console.log("mongoDB Is connected"))
.catch((err)=>console.log(err))

app.use("/",route)

app.listen(PORT ,()=>{
    console.log("Express app running on Port",PORT )
})


//VtQrNsNLrQPgIreS