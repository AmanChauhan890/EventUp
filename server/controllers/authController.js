const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const generateToken = (id, role) => {
   return jwt.sign({id,role}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

const register = async(req,res) => {
    try{
        const {name, email, password, role} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User Already Exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });
    }catch(err){
        res.status(500).json({message: 'Server Error'});
    }
};

const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User Does not exist! Please Register"});
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if(!isMatchPassword){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id,user.role)

        });

    }catch(err){
        res.status(500).json({message: 'Server Error'})
    }
};

module.exports = {register, login};