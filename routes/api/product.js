const express = require('express');
const router = express.Router();
const { validator, validationResult, check } = require('express-validator');
const { route } = require('express/lib/router');
const Product = require('../../models/Product');

// @route   POST /product
// @desc    Create a new product
router.post('/', [
    check('name', 'Name is required')
        .trim()
        .notEmpty(),
    check('price')
        .notEmpty().withMessage('Price cannot be empty').bail()
        .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
    check('stock')
        .if((value, { req }) => value).bail()
        .isFloat({ min: 0 }).withMessage('Stock cannot be negative')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
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
        res.redirect('/');
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

// @route   DELETE /product/:sku
// @desc    Delete a product by sku
router.delete('/:sku', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ sku: req.params.sku });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
})

// @route   PUT /product/:sku
// @desc    Edit a product
router.put('/:sku', [
    check('stock', 'Stock cannot be negative').isFloat({ min: 0 }),
    check('price', 'Price cannot be negative').isFloat({ min: 0 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name,
        brand,
        sku,
        price,
        stock
    } = req.body;

    let productFields = {};
    if (name) productFields.name = name;
    productFields.brand = brand;
    if (sku) productFields.sku = sku;
    if (price) productFields.price = price;
    if (stock) productFields.stock = stock;

    try {
        const product = await Product.findOneAndUpdate(
            { sku: req.params.sku },
            { $set: productFields },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.redirect('/');
    } catch (error) {
        console.error(err.message);
        res.status(500).send();
    }
})

module.exports = router;