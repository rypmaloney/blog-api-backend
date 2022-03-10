const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('./models/User');

//Define passpprt local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        });
    })
);

//Allow only requests with the appropriate token to use the route
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            secretOrKey: `${process.env.JWT_SECRET}`,
        },
        async (token, done) => {
            try {
                console.log(token);
                return done(null, token.user);
            } catch (error) {
                console.log(token);
                return done(error);
            }
        }
    )
);
