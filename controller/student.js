
const Student = require("../modals/StudentModal")

// add student
const addStudent = async (req, res) => {
    const { IDcard, fname, lname, Dob, Obtainedmarks } = req.body
    const newStudent = new Student({ IDcard, fname, lname, Dob, Obtainedmarks })
    try {
        const oldStudent = await Student.findOne({ IDcard })
        if (!oldStudent) {
            await newStudent.save()
            res.status(200).json({
                data: newStudent,
                message: "Student added successfully"
            })
        } else {
            res.status(400).json({ message: "Student already exists" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}



// Get students
const getStudents = async (req, res) => {
    try {
        const allStudents = await Student.find()
        res.status(200).json({
            data: allStudents,
        })
    } catch (err) {
        res.status(500).json(err)
    }
}


// Update students 
const updateStudent = async (req, res) => {
    const { id } = req.params
 
    try {
        const updatedStudents = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
        })

        console.log(updatedStudents)
        // await updateStudent.save()
        res.status(200).json({
            data: updatedStudents,
            message: "student updated successfully"
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

// Delete student

const deleteStudent = async (req, res) => {
    const { id } = req.params
    console.log("id", id)
    try {
        await Student.findByIdAndDelete(id)
        res.status(200).json({
            message: "Student deleted"
        })
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports = { addStudent, getStudents, updateStudent, deleteStudent }