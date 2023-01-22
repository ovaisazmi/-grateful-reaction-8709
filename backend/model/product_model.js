const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "title": String,
    "description": String,
    "price": Number,
    "discprice": Number,
    "image": String
})

const product_model = mongoose.model("productcollection", productSchema)

module.exports = { product_model }