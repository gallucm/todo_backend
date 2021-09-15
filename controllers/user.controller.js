const validator = require('validator');
const User = require('../models/user');

const test = async (req, res) => {
    res.status(200).json({
        code: 200,
        message: "test working",
    });
};

const create = async (req, res) => {
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
        const user = new User();
        user.username = params.username;
        user.email = params.email;
        user.password = params.password;
        user.image = null;

        const exist = await User.findOne({ email: user.email });
        if (exist) {
            return res.status(403).json({
                code: 403,
                message: "Email already exist"
            });
        } else {
            try {
                const stored = await user.save();
                res.status(200).json({
                    code: 200,
                    user: stored
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
    test,
    create
}