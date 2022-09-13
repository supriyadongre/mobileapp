const express = require("express");
const app = express();
const BodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect()

app.use(express.static(__dirname + "/"))

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/register.html")
})
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/login.html")
})
app.get("/dashboard", function (req, res) {
    res.sendFile(__dirname + "/dashboard.html")
})

app.listen(3000, function () {
    console.log("server is running on 3000 port")
})

