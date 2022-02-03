const mongoose = require('mongoose');

let db = process.env.DB_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB connected...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;