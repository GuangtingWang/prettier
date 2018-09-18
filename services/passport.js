const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// Get the model class
const User = mongoose.model('users');

// Push id(not google profile id) to the cookie
passport.serializeUser( (user,done) => {
    done(null,user.id);
});

// Get the id and return the user object
passport.deserializeUser( (id,done) => {
     User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        // If run through proxy, trust it
        //solve the 'https' issue
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // Query for a user with googleId == profile.id
        // Return a promise
        const existedUser = await User.findOne({ googleId: profile.id })
            if (existedUser){
                // err: null, findItem: existedUser
                return done(null, existedUser);
            }
            // Create a new user
            const user = await new User({ googleId: profile.id, displayName: profile.displayName }).save()
            done(null, user);
    })
);