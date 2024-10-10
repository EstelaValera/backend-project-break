const admin = require('../config/firebase');

// Mostrar formulario de registro
const showRegisterForm = (req, res) => {
    res.send(`
    <h2>Registro</h2>
    <form action="/auth/register" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Registrarse</button>
    </form>
    `);
};

// Registrar nuevo usuario
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    const userRecord = await admin.auth().createUser({
        email,
        password,
    });
    console.log('Usuario registrado con éxito:', userRecord.uid);
    res.redirect('/auth/login');
    } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).send('Error al registrar usuario');
    }
};

// Mostrar formulario de login
const showLoginForm = (req, res) => {
    res.send(`
    <h2>Iniciar Sesión</h2>
    <form action="/auth/login" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Iniciar Sesión</button>
    </form>
    `);
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    // Autenticar al usuario con Firebase
    const user = await admin.auth().getUserByEmail(email);
    
    // Comprobar las credenciales
    if (user) {
      // Simulamos autenticación local para simplificar
      // Puedes agregar lógica extra para generar un token o manejar sesiones aquí
      res.redirect('/dashboard');  // Redirigir al dashboard después del login
    } else {
        res.status(401).send('Credenciales incorrectas');
    }
    } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
    }
};

// Cerrar sesión del usuario
const logoutUser = (req, res) => {
  // Destruir la sesión o eliminar el token (según el manejo de sesiones)
    req.session = null;
    res.redirect('/auth/login');
};

module.exports = {
    showRegisterForm,
    registerUser,
    showLoginForm,
    loginUser,
    logoutUser,
};