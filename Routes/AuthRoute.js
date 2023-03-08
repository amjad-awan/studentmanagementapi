const express = require("express");
const { RegisterUser, getUser, login } =require("../controller/auth"); 
const route = express.Router()
route.post("/register", RegisterUser)
route.post("/login",login)
route.get("/get-users", getUser)
// route.get("/get-students", getStudents)
// route.put("/edit-student/:id", updateStudent)
// route.delete("/delete-student/:id", deleteStudent)


module.exports=route