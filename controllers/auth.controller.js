const UserService = require('../services/user.service');
const service = new UserService();
const { models } = require('../config/sequelize');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const registerUser  = async ( req, res ) => { 
    try { 
        console.log(req.body);
        const { firstName,lastName, phone,role,email, password } = req.body;
        // Check if the email exists 
        const userExists = await service.findByEmail(email)
        if (userExists) {
           
            return res.status(400).json('Email is already associated with an account');
        }

        await models.User.create({
            firstName,lastName, phone,role,email,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(201).json('Registration successful');
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.findByEmail(email)
        if (!user) {
            return res.status(404).json('Email not found');
        }


        // Verify password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }

console.log("user");
        // Authenticate user with jwt
        const token = await jwt.sign({ id: user.id, name: user.firstName+ " " + user.lastName,role:user.Role,
        email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d' // Use '1h' for 1 hour expiration
        });
        console.log("user");
   
        res.status(200).send({
            id: user.id,
            name: user.firstName+ " " + user.firstName,
            email: user.email,
            role:user.Role,
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).send('Sign in error');
    }
}
module.exports = {
    registerUser,
    signInUser
};
