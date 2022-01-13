const express = require('express');
const router = express.Router();
const { validator, validationResult, check } = require('express-validator');
const { route } = require('express/lib/router');
const Product = require('../models/Product');

// @route   POST /product
// @desc    Create a new product
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('sku', 'SKU is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log(req.body);
        let product = await Product.findOne({ sku: req.body.sku });
        if (product) {
            return res.status(400).json({ errors: ['Product already exists'] });
        }

        product = new Product({
            name: req.body.name,
            brand: req.body.brand,
            sku: req.body.sku,
            price: req.body.price,
            stock: req.body.stock
        })
        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route   GET /product
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
})

// @route   GET /product/:sku
// @desc    Get product by sku
router.get('/:sku', async (req, res) => {
    try {
        const product = await Product.findOne({ sku: req.params.sku });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
})

module.exports = router;