const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true
    },
    brand: {
        type: String
    },
    sku: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);