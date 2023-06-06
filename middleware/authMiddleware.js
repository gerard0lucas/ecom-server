const jwt = require("jsonwebtoken");
const Euser = require("../models/userModel");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("authorization token required");
    return res.status(401).json({ message: "authorization token required " });
  }

  const token = authorization  ;
  try {
    const { _id } = jwt.verify(token, process.env.jwt);
    req.user = await Euser.findOne({ _id }).select("_id").select("_id");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};



const isAdmin = async (req,res,next) =>{
    const id = req.user._id;
    const user = await Euser.findById(id)
    if(user.role == false){
      res.status(200).json({message:"not admin"})
    }else{
      next()
    }
    }
    

module.exports = {auth, isAdmin};
