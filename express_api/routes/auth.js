const express = require("express");
const passport = require("passport");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const auth = express.Router();

// Basic strategy
require("../utils/basic_auth");

auth.post("/token", async function(req, res, next) {
    passport.authenticate('basic',
        { successRedirect: '/', failureRedirect: '/login' },
        (error, user) => {
        try {
            console.log(user);
            if (error || !user) {
                next(boom.unauthorized());
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    next(error);
                }

                const payload = { sub: user.firstName, email: user.email };
                const token = jwt.sign(payload, '86943543A8E51A43CE69EEF88A3F3', {
                    expiresIn: "15m"
                });

                return res.status(200).json({ access_token: token });
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});

module.exports = auth;