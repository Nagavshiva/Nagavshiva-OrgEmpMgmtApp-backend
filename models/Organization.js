const mongoose = require('mongoose');


const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        default: 0,
    },
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
        },
    ],
})

module.exports = mongoose.model('Organization', organizationSchema)