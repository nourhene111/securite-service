const express = require('express');
const router = express.Router(); 
const authController = require('../controllers/auth.controller');

router
    
.post('/register', authController.registerUser )
    .post('/login', authController.signInUser)
     

module.exports = router;
