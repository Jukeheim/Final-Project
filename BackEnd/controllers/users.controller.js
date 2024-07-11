const User = require("../models/User.model");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res, next) => {
    const { email, password, username, profilePicture } = req.body;

    User.create({ email, password, username, profilePicture })
        .then((userCreated) => {
            res.status(201).json(userCreated);
        })
        .catch(next);
};

module.exports.list = (req, res, next) => {
    User.find()
        .then((users) => res.json(users))
        .catch(next);
};

module.exports.getUser = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                next(createError(404, "User not found"));
            } else {
                res.json(user);
            }
        })
        .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.currentUserId)
        .then((user) => {
            if (!user) {
                next(createError(404, "User not found"));
            } else {
                res.json(user);
            }
        })
        .catch(next);
};
