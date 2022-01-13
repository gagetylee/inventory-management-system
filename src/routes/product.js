const express = require('express');
const router = express.Router();
const { validator, validationResult, check } = require('express-validator');
const Product = require('../models/Product');

// @route   POST /item
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

module.exports = router;