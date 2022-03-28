const config = require('config');
const mongoose = require('mongoose');

const db = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.r9yfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB connected...')
    } catch (err) {
        console.error("Invalid MongoDB credentials");
        process.exit(1);
    }
}

module.exports = connectDB;