const keys = require('../config/keys');
// this is for backend use. Import with secret key
const stripe = require('stripe')(keys.stripeSecretKey);
// Import middleware to check login status
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

    app.post('/api/stripe',requireLogin, async (req, res) => {
        // this will make a request to stripe api to make a charge
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            // body-parser -> body.id
            source: req.body.id
        });    
        req.user.credits += 500;
        const user =await req.user.save();
        res.send(user);
    });

}
