// controllers/auth.controller.js
const User = require('../models/User.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../services/emailServices');

module.exports.login = (req, res, next) => {
    const loginError = createError(401, 'Email or password incorrect');
    const { email, password } = req.body;

    if (!email || !password) {
        return next(loginError);
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return next(loginError);
            }

            return user.checkPassword(password).then((match) => {
                if (!match) {
                    return next(loginError);
                }

                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET || 'test',
                    {
                        expiresIn: '1h',
                    }
                );

                res.json(token);
            });
        })
        .catch(next);
};

module.exports.register = (req, res, next) => {
    const { email, password, username } = req.body;

    const newUser = new User({
        email,
        password,
        username,
    });

    newUser.save()
        .then(user => {
            // Send welcome email
            const subject = 'Welcome to Our App';
            const text = `Hello ${username},\n\nWelcome to our app! We are excited to have you with us.\n\nBest Regards,\nThe Team`;

            sendEmail(email, subject, text);
            res.status(201).json({ message: 'User registered successfully. Welcome email sent.' });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};
