// Verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.session.username) {
        return next();
    }
    res.redirect('/auth/login');
};

app.get('/products', isAuthenticated, (req, res) => {
    res.send('Bienvenido a la página de productos');
});

app.get('/admin', isAuthenticated, (req, res) => {
    res.send('Bienvenido a la página de administración');
});