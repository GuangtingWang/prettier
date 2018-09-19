const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a schema
const userSchema = new Schema({
    googleId: String,
    displayName: String,
    credits: {
        type: Number,
        default: 0
    }
})

//create model class
mongoose.model('users', userSchema);
