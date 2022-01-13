const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
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
        validate(value) {
            if (value < 0) {
                throw new Error('Price cannot be negative');
            }
        },
    },
    stock: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Stock cannot be negative');
            }
        },
        default: 0
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);