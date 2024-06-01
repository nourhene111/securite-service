const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/user.controller');

router
    .get('/getUserList', userController.get )
    .get('/getMembrList', userController.getMembrList)
    .get('/:id', userController.getById )
    .post('/create', userController.createUser )
    .put('/:id', userController.update )
    .delete('/:id', userController._delete )
   

module.exports = router;
