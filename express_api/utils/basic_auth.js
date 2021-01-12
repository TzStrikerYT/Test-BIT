const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("boom");
const bcrypt = require("bcrypt");
const UserService = require('../services/users');
const User = new UserService();

passport.use('basic',
    new BasicStrategy(User,async function(userEmail, userPwd, cb) {

        try {
            const [user] = await User.getUsersByCredentials(userEmail);

            if (!user) {
                return cb(boom.unauthorized(), false);
            }

            if (!(await bcrypt.compare(userPwd, user.password))) {
                return cb(boom.unauthorized(), false);
            }

            return cb(null, user);
        } catch (error) {
            return cb(error);
        }
    })
);