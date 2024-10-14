const { db } = require('../config/firebase'); 
const { collection, query, where, getDocs } = require('firebase/firestore'); 
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

const bcrypt = require('bcrypt'); 


const showRegisterForm = (req, res) => {
    res.send(baseHtml() + getNavBar() + getRegisterForm());
};

const getNavBar = () => `
    <nav>
        <a href="/products">Inicio</a>
        <a href="/products/show">Nuevo Producto</a>
    </nav>
`;

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const auth = getAuth(); 

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;

        req.session.username = user.email;

        res.redirect('/products');
    } catch (error) {
        console.error('Error al registrar usuario en Firebase:', error);
        res.status(500).send('Error al registrar el usuario');
    }
};


const showLoginFormAuth = () => {
    return (getLoginForm() + getRegisterForm());
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userQuery = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            return res.status(400).send('Usuario no encontrado');
        }
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const validPassword = await bcrypt.compare(password, userData.password);

        if (!validPassword) {
            return res.status(400).send('Contraseña incorrecta');
        }
        req.session.username = username;
        res.redirect('/products');
    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
};


const getRegisterForm = () => `
    <form class="register" action="/auth/register" method="POST">
        <input type="text" name="username" placeholder="Usuario" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <button type="submit">Registrar</button>
    </form>
`;


const getLoginForm = () => `
    <form class="login" action="/auth/login" method="POST">
        <input type="text" name="username" placeholder="Usuario" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar Sesión</button>
    </form>
`;


module.exports = {
    showRegisterForm,
    registerUser,
    showLoginFormAuth,
    loginUser
};