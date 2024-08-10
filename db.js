const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // จบการทำงานของแอพพลิเคชั่นถ้าเชื่อมต่อไม่ได้
    }
};

module.exports = connectDB;