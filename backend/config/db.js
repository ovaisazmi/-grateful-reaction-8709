const mongoose=require("mongoose")
require("dotenv").config();
const connection=mongoose.connect(process.env.atlas)
mongoose.set('strictQuery', true)
module.exports={connection}