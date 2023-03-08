const express = require("express")
const app = express()
const mongoose = require("mongoose");
const cors= require("cors")
const bodyParser = require('body-parser')
const StudentRoute = require("./Routes/StudentRoute")
const AuthRoute= require("./Routes/AuthRoute") 
// const DB= require("./DB")
require("dotenv").config();
const PORT = process.env.PORT || 8080
// parse application/x-www-form-urlencoded

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser.json());

// parse application/json
mongoose.connect('mongodb://127.0.0.1:27017/StudentManageSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});


app.use("/api/", StudentRoute)
app.use("/api/", AuthRoute)
app.listen(PORT, () => {
  console.log("app is running at " + PORT)
})