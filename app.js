//import libraries
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const body_parser = require("body-parser")
require("dotenv/config")

app.use(body_parser.json())

//import routes
const posts_route = require("./routes/posts")

app.use("/posts", posts_route)

app.get("/", (req, res) => {
    res.send("hello there")
})

mongoose.connect(
    process.env.DB_connection,
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    },
    () => console.log("connect to database")
)

app.listen(3000)