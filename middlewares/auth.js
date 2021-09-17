const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("x-token");
        if (!token) 
            return res.status(403).send({
                code: 403,
                error: "No token provided"
            });

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({
            code: 400,
            error,
        });
    }
};