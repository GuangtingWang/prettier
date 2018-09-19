const keys = require('./config/keys');

// This is common JS,// ES2015 modules(import syntax) not supported by node.js
const express = require('express');

// Import mongoose
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// Connect DB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Create mongo model, must before importing passport 
require('./models/User');

// Import passport service, after importing db
require('./services/passport');

// Import routes as a function
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const app = express(); 

// Set cookie existance time and keys to encrpyt cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
//use body parser middleware, assign to request body to req.body
app.use(bodyParser.json());

// Initialize passport
app.use(passport.initialize());
// Convert the request object from session_id to deserialized user object
app.use(passport.session());

// Pass app object to routes function
authRoutes(app);
billingRoutes(app);






const PORT = process.env.PORT || 5000;

app.listen(PORT);