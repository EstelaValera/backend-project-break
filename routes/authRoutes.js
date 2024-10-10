const express = require('express');
const router = express.Router();
const {
    showRegisterForm,
    registerUser,
    showLoginForm,
    loginUser,
    logoutUser
} = require('../controllers/authController');

// Rutas de autenticación
router.get('/register', showRegisterForm);
router.post('/register', registerUser);

router.get('/login', showLoginForm);
router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;