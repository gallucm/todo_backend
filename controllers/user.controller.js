const validator = require('validator');
const User = require('../models/user');
const { generateHash } = require('../helpers/bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        var validEmail = !validator.isEmpty(email) && validator.isEmail(email);
        var validPassword = !validator.isEmpty(password);
    } catch (err) {
        return res.status(403).json({
            code: 403,
            message: "One o more field are missing"
        });
    }

    if (validEmail && validPassword) {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                code: 400,
                message: "Email or password are wrong"
            });
        } else {
            if (user.password === password) {
                const token = user.generateAuthToken();

                res.status(200).json({
                    code: 200,
                    token
                });
            } else {
                res.status(400).json({
                    code: 400,
                    message: "Email or password are wrong 2"
                });
            }
        }
    } else {
        res.status(403).json({
            code: 403,
            message: "One o more field are wrong"
        });
    }
}

const register = async (req, res) => {
    const params = req.body;

    try {
        var validUsername = !validator.isEmpty(params.username);
        var validEmail = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validPassword = !validator.isEmpty(params.password);
    } catch (err) {
        return res.status(403).json({
            code: 403,
            message: "One o more field are missing"
        });
    }

    if (validUsername && validEmail && validPassword) {        
        const exist = await User.findOne({ email: params.email });

        if (exist) {
            return res.status(403).json({
                code: 403,
                message: "Email already exist"
            });
        } else {
            let user = new User();
            user.username = params.username;
            user.email = params.email;
            user.password = await generateHash(params.password);
            user.image = null;

            try {
                await user.save();
                res.status(201).json({
                    code: 201,
                    message: "User created"
                });
            } catch (err) {
                res.status(500).json({
                    error: err,
                    code: 500,
                    message: "Internal server error"
                });
            }
        }
    } else {
        res.status(403).json({
            code: 403,
            message: "One o more field are wrong"
        });
    }
}

module.exports = {
    login,
    register
}