const mongoose = require('mongoose');

let db = 'mongodb+srv://root:thDXGHSjnlKCsKo4@cluster0.r9yfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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