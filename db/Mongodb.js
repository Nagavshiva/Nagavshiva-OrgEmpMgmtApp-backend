const mongoose = require('mongoose');


const DbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB)
        console.log('MongoDB database connection established successfully')

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with a failure status
    }
}

module.exports = DbConnection;