const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    fname: String, lname: String,
    Dob: {
        type: Date,
        required: true
    },
    Obtainedmarks: {
        type: Number,
        required: true
    }
    ,IDcard: {
        type: String,
        required: true
    }
}, {
    timestamps:{}
}
);

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student 