const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.showProducts); // Ruta de inicio de la página
router.get('/products', productController.showProducts); // Inicio: Ver todos los productos
router.get('/products/category/:category', productController.showProductsByCategory); // Ver productos por categoría
router.get('/products/show', productController.showNewProduct); // Formulario de creación
router.post('/products/create', productController.createProduct); // Crear nuevo producto
router.get('/products/:productId', productController.showProductById); // Ver detalles del producto
router.post('/:productId/delete', productController.deleteProduct); // Eliminar un producto
router.get('/:productId/edit', productController.showEditProduct); // Formulario de edición
router.post('/:productId/edit', productController.updateProduct); // Hacer la atualización


module.exports = router;
