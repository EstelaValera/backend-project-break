const Product =  require('../models/Product');
const mongoose = require('mongoose');


//mostrar todos los productos
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productCards = getProductCards(products);
        res.send(baseHtml() + getNavBar() + productCards);  // Mostrar los productos
    } catch (err) {
        res.status(500).send('Error al obtener productos');
    }
};


//mostrar un producto por ID
const showProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send(baseHtml() + getNavBar() + getProductDetails(product));
    } catch (err) {
        res.status(500).send('Error al obtener el producto');
    }
};


//Mostrar detalles del producto
const getProductDetails = (product) => {
    return `
        <div class="details">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.price}€</p>
            <p>${product.description}</p>

            <form action="/${product._id}/delete" method="POST">
                <button type="submit">Eliminar Producto</button>
            </form>
        </div>
    `;
};


//mostrar formulario para crear un produto
const showNewProduct = (req, res) => {
    res.send(baseHtml() + getNavBar() + getProductForm());
};


//crear un producto
const createProduct = async (req, res) => {
    const { name, description, image, category, size, price } = req.body;
    try {
        const product = new Product({ name, description, image, category, size, price });
        await product.save();
        res.redirect('/products'); // Redirigir a la lista de productos
    } catch (err) {
        res.status(500).send('Error al crear el producto');
    }
};

//mostrar formulario de edición de un producto
// const showEditProduct = async (req, res) => {
//     const product = await Product.findById(req.params.productId);
//     if (!product) {
//         return res.status(404).send('Producto no encontrado');
//     }
//     res.send(baseHtml() + getNavBar() + getEditProductForm(product));
// };

//Actualizar un producto
// const updateProduct = async (req, res) => {
//     const { name, description, image, category, size, price } = req.body;
//     try {
//         await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
//         res.redirect('/dasboard');
//     } catch (err) {
//         res.status(500).send('Error al actualizar el producto');
//     }
// };

//Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).send('Producto no encontrado');
        }
        res.redirect('/products'); 
    } catch (err) {
        res.status(500).send('Error al eliminar el producto');
    }
};

//Funciones auxiliares para visualizar el html
const getProductCards = (products) => {
    return `
        <div class="product-list">
            ${products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.price}€</p>
                    <a href="/products/${product._id}">Ver detalle</a>
                </div>
            `).join('')}
        </div>
    `;
};

// Mostrar productos por categoría
const showProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        const productCards = getProductCards(products);
        res.send(baseHtml() + getNavBar() + productCards);  // Mostrar productos de la categoría
    } catch (err) {
        res.status(500).send('Error al obtener productos de la categoría');
    }
};

const getInicio =async (req, res) => {
    try {
        res.send(baseHtml() + getNavBar());
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener productos de la categoría');
    }
};

const baseHtml = () => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Tienda de ropa</title>
        <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
        <h1>Bienvenido a la Tienda de Ropa</h1>
        <p>Elige una categoría:</p>
        <nav class="categorías">
            <a href="/products/category/camisetas">Camisetas</a>
            <a href="/products/category/pantalones">Pantalones</a>
            <a href="/products/category/zapatos">Zapatos</a>
            <a href="/products/category/accesorios">Accesorios</a>
        </nav>
    </body>
    </html>
`;


const getNavBar = () => `
    <nav>
        <a href="/products">Inicio</a>
        <a href="/products/show">Nuevo Producto</a>
    </nav>
`;


const getProductForm = () => `
    <h1>Crear nuevo producto</h1>
    <form class="formulario" action="/products/create" method="POST">
        <input type="text" name="name" placeholder="Nombre" required>
        <input type="text" name="description" placeholder="Descripción" required>
        <input type="text" name="image" placeholder="Imagen (URL)">
        <input type="text" name="category" placeholder="Categoría" required>
        <input type="text" name="size" placeholder="Talla" required>
        <input type="number" name="price" placeholder="Precio" required>
    <button type="submit">Crear Producto</button>
    </form>`

module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    //showEditProduct,
    //updateProduct,
    deleteProduct,
    showProductsByCategory,
    getInicio,
    getProductDetails,
};