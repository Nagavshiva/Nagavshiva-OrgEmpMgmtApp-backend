const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbconnection = require('./db/Mongodb');
const organizationRoutes = require("./routes/organizationRoutes");
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Enable CORS for all routes, allowing cross-origin requests
app.use(cors());

// Parse incoming JSON requests and make it available on req.body
app.use(express.json());

// Module for loading environment variables from a .env file
dotenv.config();

// Establish database connection
dbconnection();

//  routes
app.use('/organizations', organizationRoutes);
app.use('/employees', employeeRoutes);


// Start the server and listen on the specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
