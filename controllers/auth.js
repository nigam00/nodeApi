const jwt = require ('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config();

exports.signup = async (req,res)=>{
	const userExists = await User.findOne({email: req.body.email})
	if(userExists) return res.status(403).json({
		error:"Email is taken!"
	})

	const user = await new User(req.body)
	await user.save()
	res.json({message:"Signup Success! Please Login"});
};

exports.signin = (req, res) => {
	//find the user based on email
	const {email, password} = req.body
	User.findOne({email},(err,user)=>{
		//if error or no user
		if(err || !user){
			return res.status(401).json({
				error:"User with this email doesnot exist . Please signup"
			})
		}
		//if user is found make sure email and pass match
		// create authenticator method in model and use here
		if(!user.authenticate(password)){
			return res.status(401).json({
				error:"Email and passeord do not match."
			})
		}
		//generate token with user id and secret
		const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
		//persist token in cookie with expiry
		res.cookie("token",token, {expire: new Date() + 9999});
		//return response with user and token to frontend
		const {_id, name, email} = user
		return res.json({token , user:{_id, name, email}})
	})

}
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.json({message:"Signout success!"});
}