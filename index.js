const express = require('express');
const { dbConnection } = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Conexión a la base de datos
dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

// Definir rutas
app.use('/', productRoutes);  // Redirigir a productRoutes
app.use('/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});