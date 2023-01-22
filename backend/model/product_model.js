const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "title": String,
    "note": String,
    "category": String,
    "userID": String
})

const product_model = mongoose.model("productcollection", productSchema)

module.exports = { product_model }