const express = require('express');
const connectDB = require('./db/mongoose');
const app = express();

// Connect to database
connectDB();

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})