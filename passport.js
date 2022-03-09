const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./models/User');

//Define passpprt local strategyn
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
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_SECRET}`,
        },
        function (jwtPayload, cb) {
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return User.findOneById(jwtPayload.id)
                .then((user) => {
                    return cb(null, user);
                })
                .catch((err) => {
                    return cb(err);
                });
        }
    )
);
