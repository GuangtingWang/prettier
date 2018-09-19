module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({ error: 'You must log in!' });
    }
    // go to next middleware or go to the actual route handler
    next();
};