const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const { dbConnection } = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

app.use(session({
    secret: 'secreto-secretísimo', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const isAuthenticated = (req, res, next) => {
    if (req.session.username) {
        return next();
    }
    res.redirect('/auth/login');
};

app.use('/', productRoutes); 
app.use('/products', productRoutes); 
app.use('/auth', authRoutes);

app.get('/products', isAuthenticated, (req, res) => {
    res.send('Lista de productos');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});