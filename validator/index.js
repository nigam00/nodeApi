exports.createPostValidator = (req, res, next)=>{
	//title
	req.check('title',"Write a title").notEmpty()
	req.check('title',"Title must be between 4-150 chars").isLength({
		min:4, 
		max:150
	});
		//body
	req.check('body',"Write a body").notEmpty()
	req.check('body',"Title must be between 4-2000 chars").isLength({
		min:4, 
		max:2000
	});
	//check for errors
	const errors = req.validationErrors()
	//if errors show first one
	if(errors){
		const firstError = errors.map((error)=>error.msg)[0]
		return res.status(400).json({error:firstError})
	}

	//proceed to next middleware
	next();
};

exports.userSignupValidator = (req, res, next) => {
	//name is not null and between 4-10 char
	req.check("name", "Name is required").notEmpty();

	//email is not null and valid
	req.check("email", "Email is required").notEmpty();
	req.check("email", "Email must be valid")
	.matches(/\S+@\S+\.\S+/)
	.withMessage("Email must contain @")

	// check for pass
	req.check("password","Password is required").notEmpty();
	req.check("password")
	.isLength({min:6})
	.withMessage("Password must contain atleast 6 characters.")
	.matches(/\d/)
	.withMessage("Password must contain a number.")
	
	// check for errors
	const errors = req.validationErrors()
	//if errors show first one
	if(errors){
		const firstError = errors.map((error)=>error.msg)[0]
		return res.status(400).json({error:firstError})
	}

	//proceed to next middleware
	next();
}