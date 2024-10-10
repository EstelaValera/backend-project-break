const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta de inicio para productos
router.get('/products', productController.showProducts); // Ver todos los productos
router.get('/products/category/:category', productController.showProductsByCategory); // Ver productos por categoría
router.get('/products/show', productController.showNewProduct); // Formulario de creación
router.post('/products/create', productController.createProduct); // Crear nuevo producto
router.get('/products/:productId', productController.showProductById); // Ver detalles del producto
router.post('/:productId/delete', productController.deleteProduct); // Eliminar un producto

module.exports = router;
