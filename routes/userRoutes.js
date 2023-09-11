const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/login-dean', userController.loginDean);
router.post('/register-dean', userController.registerDean);


module.exports = router;
