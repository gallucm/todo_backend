const validator = require('validator');
const User = require('../models/user');
const { generateHash, comparePassword } = require('../helpers/bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;

    const errors = [];

    if (!email || !validator.isEmail(email))
        errors.push({ text: "Email is not valid" });

    if (!password)
        errors.push({ text: "Password is required" });

    if (errors.length > 0)
        return res.status(400).json({
            code: 400,
            errors
        });

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(403).json({
            code: 403,
            message: "Email or password are wrong"
        });
    } else {
        const validPassword = await comparePassword(password, user.password);

        if (validPassword) {
            const token = user.generateAuthToken();

            res.status(200).json({
                code: 200,
                token,
                user: { id: user._id, username: user.username, email: user.email, image: user.image}
            });
        } else {
            res.status(403).json({
                code: 403,
                message: "Email or password are wrong"
            });
        }
    }
}

const update = async (req, res) => {
    const { username, email } = req.body;
    const { id } = req.params;

    const errors = [];

    if (!username)
        errors.push({ text: "Username is required" });

    if (!email || !validator.isEmail(email))
        errors.push({ text: "Email is not valid" });

    if (errors.length > 0)
        res.status(400).json({
            code: 400,
            errors
        });

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            code: 404,
            message: "User not found"
        });
    } else {
        user.username = username;
        user.email = email;

        await user.save();

        const token = user.generateAuthToken();

        res.status(200).json({
            code: 200,
            token
        });
    }
}

const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    const errors = [];

    if (!password)
        errors.push({ text: "Password is required" });

    if (!newPassword)
        errors.push({ text: "New password is required" });

    if (errors.length > 0)
        return res.status(400).json({
            code: 400,
            errors
        });

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            code: 404,
            message: "User not found"
        });
    } else {
        const validPassword = await comparePassword(password, user.password);

        if (validPassword) {
            user.password = await generateHash(newPassword);
            await user.save();

            return res.status(200).json({
                code: 200,
                message: "Password updated"
            });
        } else {
            return res.status(403).json({
                code: 403,
                message: "Password is wrong"
            });
        }
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const errors = [];

    if (!username)
        errors.push({ text: "Username is required" });

    if (!email || !validator.isEmail(email))
        errors.push({ text: "Email is not valid" });

    if (!password)
        errors.push({ text: "Password is required" });

    if (errors.length > 0)
        res.status(400).json({
            code: 400,
            errors
        });

    const exist = await User.findOne({ email });

    if (exist) {
        return res.status(403).json({
            code: 403,
            message: "Email already exist"
        });
    } else {

        try {
            let user = new User({});
            user.username = username;
            user.email = email;
            user.password = await generateHash(password);
            user.image = null;
            
            await user.save();
            res.status(201).json({
                code: 201,
                message: "User created"
            });
        } catch (err) {
            res.status(500).json({
                code: 500,
                error: err
            });
        }
    }
}

module.exports = {
    login,
    register,
    update,
    updatePassword
}