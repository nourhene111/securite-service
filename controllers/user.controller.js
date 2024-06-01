const UserService = require('../services/user.service');
const service = new UserService();
const { models } = require('../config/sequelize');
const bcrypt=require('bcrypt')

const createUser  = async ( req, res ) => {
    try { 
        const { firstName,lastName, phone,role,email, password } = req.body;
        // Check if the email exists
        const userExists = await service.findByEmail(email)
        if (userExists) {
            return res.status(400).send('Email is already associated with an account');
        }


        await models.User.create({
            firstName,lastName, phone,email,Role:role,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(201).send({message:'Registration successful'});
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async ( req, res ) => {
    try {
        const response = await service.find();
        const responseData = response.map(user => {
            const { firstName, lastName, email, phone, Role, createdAt } = user.dataValues;
            return { firstName, lastName, email, phone, Role, createdAt };
        });

        // Send back the new array of objects in the response
        res.json(responseData);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const response = await service.findOne(id);
        const { firstName, lastName ,email,phone} = response;

        // Sending back the extracted fields
        res.json({ firstName, lastName,email,phone });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id,body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params; 
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const getMembrList=async(req,res)=>{
    try {
        console.log("getsssssssssssssss");
        const response = await service.find();
        console.log(response);
        const filteredUsers = response.filter(user => user.dataValues.Role === 'Membre');

       
        const responseData = filteredUsers.map(user => {
            const { id,firstName, lastName, email, phone, Role, createdAt } = user.dataValues;
            return { id,firstName, lastName, email, phone, Role, createdAt };
        });

        res.json(responseData);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    createUser, get, getById, update, _delete,getMembrList
};
