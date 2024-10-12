const mongoose = require('mongoose');
const { required } = require('yargs');

const ProductSchema = new mongoose.Schema({

        name: {
            type: String, 
            required: true
        },

        description: {
            type: String, 
            required: true
        },

        image: {
            type: String, 
            required: true 
        },

        category: {
            type: String,
            enum: ['camisetas', 'pantalones', 'zapatos', 'accesorios'],
            required: true
        },

        size: {
            type: String,
            enum: ['XS', 'S', 'M', 'L', 'XL', 'TALLA UNICA'],
            required: true
        },

        price:{
            type: Number,
            required: true
        },
    });

    //{ timestamps: true }

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;