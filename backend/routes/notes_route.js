const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { product_model } = require("../model/product_model")

const product_router = express.Router();


product_router.get("/all", async(req, res) => {

    try {
        let allnotes = await product_model.find();
        res.send(allnotes)
    } catch (error) {
        console.log(error);
        res.send({ "Error": error.message })
    }

})


product_router.post("/create", async(req, res) => {
    let payload = req.body;

    try {
        let newnote = new product_model(payload);
        await newnote.save();
        res.send(JSON.stringify("Note created"))
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify("Error while creating Note"))
    }

})


product_router.patch("/update/:id", async(req, res) => {
    let payload = req.body;
    let paramid = req.params.id;
    let doc = await product_model.findOne({ _id: paramid })
    if (doc.userID == payload.userID) {
        try {
            let updated = await product_model.findByIdAndUpdate({ _id: paramid }, payload)
            res.send(`Note Updated
            => ${updated}`)
        } catch (error) {
            console.log(error);
            res.send({ "Error": error.message })
        }
    } else {
        res.send("You do not have athority to change this Doc" + doc)
    }
})


product_router.delete("/delete/:id", async(req, res) => {
    let payload = req.body;
    let paramid = req.params.id;
    let doc = await product_model.findOne({ _id: paramid })
    if (doc.userID == payload.userID) {
        try {
            let deleted = await product_model.findByIdAndDelete({ _id: paramid })
            res.send(JSON.stringify("Deleted"))
        } catch (error) {
            console.log(error);
            res.send(JSON.stringify({ "Error": error.message }))
        }
    } else {
        res.send(JSON.stringify("You do not have athority to change this Doc" + doc))
    }

})


module.exports = { product_router }