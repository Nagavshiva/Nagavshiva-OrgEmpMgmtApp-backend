const mongoose = require('mongoose');


const DbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB)
        console.log('MongoDB database connection established successfully')

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    
    }
}

module.exports = DbConnection;
