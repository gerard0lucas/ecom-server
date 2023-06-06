const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Euser = require("../models/userModel");

// ............................Generating token..............................
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.jwt, { expiresIn: "3d" });
};

// ............................register user..............................
const registerUser = async (req, res) => {
    try {
        const { name, email, pnum, address, password } = req.body;
        console.log({ name, email, pnum, address, password });
        if (!name || !email || !pnum || !address || !password) {
            throw Error("required all fields");
        }
        const exist = await Euser.findOne({ email });
        if (exist) {
            throw Error("User Already Exists");
        }
        const num = await Euser.findOne({ pnum });
        if (num) {
            throw Error("User Already Exists");
        }
        // ..................................hashing password......................
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // ..................................creating user..........................
        const user = await Euser.create({
            name,
            email,
            pnum,
            address,
            password: hash,
        });
        // ...................................asigning token..........................
        const token = await createToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};
// ............................login user..............................
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw Error("all Fields required");
        }
        const user = await Euser.findOne({ email });
        if (!user) {
            throw Error("invalid email id");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error("invalid password");
        }
        // ................asigning token...............................
        const token = await createToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
        });
    }
};



const getroutes = (req,res)=>{
    res.send("protected routes")
}



module.exports = { registerUser, loginUser, getroutes };
