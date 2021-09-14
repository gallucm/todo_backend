"use strict";

// var validator = require("validator");
// var bcrypt = require("bcrypt-nodejs");
// var jwt = require("../services/jwt");
// var User = require("../models/user");

var controller = {
	test: function (req: any, res: any) {
        return res.status(200).send({
            code: 200,
            message: "Conexión correcta."
        });
	}
};

module.exports = controller;