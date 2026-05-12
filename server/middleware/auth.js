const jwt = require('jasonwebtoken');
const User = require('../models/User.js');

const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if(token && token.startsWith('Bearer ')){
        token = token.split(' ')[1];
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(err){
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else{
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, admin };