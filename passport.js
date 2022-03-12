require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('./models/User');

//Define passpprt local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user)
                return done(null, false, { message: 'Incorrect username' });
            bcryptjs.compare(password, user.password, (err, res) => {
                if (err) return done(err);
                // Passwords match, log user in!
                if (res) return done(null, user);
                // Passwords do not match!
                else
                    return done(null, false, { message: 'Incorrect password' });
            });
        });
    })
);

//Allow only requests with the appropriate token to use the route
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
