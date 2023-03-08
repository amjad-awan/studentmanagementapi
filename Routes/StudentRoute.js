const express = require("express");
const { addStudent, getStudents, updateStudent, deleteStudent } = require("../controller/student");
const route = express.Router()




route.post("/add-student", addStudent)
route.get("/get-students", getStudents)
route.put("/edit-student/:id", updateStudent)
route.delete("/delete-student/:id", deleteStudent)



module.exports=route