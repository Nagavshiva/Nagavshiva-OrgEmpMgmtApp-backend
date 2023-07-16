const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees for a specific organization
router.get('/:organizationId/employees', employeeController.getEmployees);

// Create a new employee for a specific organization
router.post('/:organizationId/employees/create', employeeController.createEmployee);

// Update an employee
router.put('/:organizationId/employees/:id', employeeController.updateEmployee);

// Delete an employee
router.delete('/:organizationId/employees/:id', employeeController.deleteEmployee);

module.exports = router;
