const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/model");




router.get("/all", async(req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, 'masai', async(err, decoded) => {
        if (err) {
            res.send("Invalid Token")
        } else {
            let user = await userModel.find()
            res.send(user)
        }
    })


})


router.post("/register", async(req, res) => {
    let { name, email, password } = req.body;

    try {
        bcrypt.hash(password, 5, async(err, hashed_data) => {
            let user = new userModel({ name, email, password: hashed_data });
            await user.save();
            res.send({ "message": "User Registered" })
        })
    } catch (error) {
        res.send({ "Error": error.message })
    }

})

router.post("/login", async(req, res) => {
    let { email, password } = req.body;
    let user = await userModel.find({ email });
    if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (result) {
                const token = jwt.sign({ userID: user[0]._id }, 'masai'); //,{ expiresIn:60*60}
                res.send({ "message": "Login Successful", "Token": token })
            } else {
                res.send({ "message": "Wrong Credentials" })
            }
        });
    } else {
        res.send({ "message": "Wrong Credentials" })
    }


})


router.patch("/update", async(req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, "masai", async(err, decoded) => {
        if (err) {
            res.send("Invalid token")
        } else {
            let newdata = req.body;
            let id = req.query.id;
            let user = await userModel.findByIdAndUpdate({ _id: id }, newdata);
            res.send(user)
        }
    })
})


router.delete("/delete", async(req, res) => {
    let id = req.query.id;
    const token = req.headers.authorization;
    jwt.verify(token, "masai", async(err, decoded) => {
        if (err) {
            res.send("Invalid token")
        } else {
            let user = await userModel.findByIdAndDelete({ _id: id });
            res.send(`Deleted successfully
            ${user}`)
        }
    })
})

module.exports = { router }