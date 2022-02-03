const express = require('express');
require('dotenv').config()
const connectDB = require('./db/mongoose');
const methodOverride = require('method-override');
const app = express();

// Connect to database
connectDB();

app.set('view engine', 'ejs');

// Init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/', require('./routes/product'));
app.use('/api/product', require('./routes/api/product'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});