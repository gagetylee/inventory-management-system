const express = require('express');
const router = express.Router();
const { route } = require('express/lib/router');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        res.render('index', { products: products });
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
})

router.get('/create', (req, res) => {
    res.render('create');
})

router.get('/edit/:sku', async (req, res) => {
    try {
        const product = await Product.find({ sku: req.params.sku });
        if (!product) {
            return res.status(404).json([{ msg: 'Product not found' }]);
        }

        res.render('edit', { product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send();
    }
})

module.exports = router;