const bcrypt = require('bcrypt');
const User= require("../modals/authModal")

const jwt= require("jsonwebtoken")
// RegisterUser
const RegisterUser = async (req, res) => {
    // const { username, email, password} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // req.body.password = hashedPass;
    // console.log("username",username,email)
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPass
    })
    const {email}=req.body
    try {
        const oldUser = await User.findOne({email})
      
        console.log("oldUser",oldUser)
        if(oldUser===null){
            const user=await newUser.save()
            const token=  jwt.sign({
                email,
                id:user._id,
            },   "admin",
            { expiresIn: "1h" } )
            res.status(200).json({
                data: user,
                token,
            })
        } else {
            res.status(400).json({ message: "User already exists"})
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//Login
const login=async (req, res)=>{
    const {email, password}= req.body
    try{
        const user= await User.findOne({email})
        console.log("user", user)
        if(user){
            const validity = await bcrypt.compare(password, user.password);
            if(validity){
                const token= jwt.sign({
                    id:user._id,
                    email
                },"admin",   { expiresIn: "1h" })
                res.status(200).json({
                    data:user,
                    token,
                })
            }else{
                res.status(403).json("password is incorrect")
            }
            console.log("validity", validity)
        }else{
            res.status(400).json("user does not exists")
        }
    }catch(err){
        res.status(500).json(err)
    }
}

//Get users

const getUser=async(req,res)=>{
try{
const allUser=await User.find()
res.status(200).json({
    date:allUser,
})
}catch(err){
res.status(500).json(err)
}
}
module.exports={RegisterUser,getUser, login}