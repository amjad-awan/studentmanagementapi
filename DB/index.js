const mongoose= require("mongoose")
export default mongoose.connect('mongodb://127.0.0.1:27017/StudentManageSystem').then(conn=>{
    console.log("Data base is connected")
}).catch(()=>{
    console.log("No Connection")
})