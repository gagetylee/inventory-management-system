const express = require('express');
const connectDB = require('./db/mongoose');
const app = express();

// Connect to database
connectDB();

app.set('view engine', 'ejs');
// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/product', require('./routes/product'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})