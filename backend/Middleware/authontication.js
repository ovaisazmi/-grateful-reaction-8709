const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const decoded = jwt.verify(token, "masai", (err, decoded) => {
            if (err) {
                console.log("Please Login")
                res.send(JSON.stringify("Please Login"))
            } else {
                // console.log(decoded)
                req.body.userID = decoded.userID
                next()
            }
        })

    } else {
        console.log("Please Login First")
        res.send("Please Login First")
    }
}
module.exports = { authentication }