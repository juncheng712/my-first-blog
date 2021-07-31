const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.create_user = (req, res, next) => {
    let { name, email, password } = req.body
    const user = new User({
        name: name,
        email: email,
        password: password,
    });
    sendToken(user, 201, res)
}

exports.login_user = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials lol", 401));
        }
        console.log(user)

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials lolipop", 401))
        }

        sendToken(user, 200, res);

    } catch (error) {
        next(error)
    }
}

exports.get_users = (req, res, next) => {
    const allUser = User.find()
    
    allUser 
        .then(user => res.status(201).json({
            message: "success",
            user: user
        }))
}

exports.delete_users = (req, res, next) => {
    const id = req.params.id
    const userToBeDeleted = User.findOneAndDelete(id)
    userToBeDeleted 
        .then(result => res.status(201).json({
            message: "User has been deleted",
        }))
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token })
}