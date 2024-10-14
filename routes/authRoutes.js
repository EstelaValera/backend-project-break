const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);
router.get('/login', authController.showLoginFormAuth);
router.post('/login', authController.loginUser);

module.exports = router;