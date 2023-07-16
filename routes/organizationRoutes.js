const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// Get all organizations
router.get('/', organizationController.getOrganizations);

// Get an organization by ID
router.get('/:id', organizationController.getOrganizationById);

// Create a new organization
router.post('/create', organizationController.createOrganization);

// upadate a organizations
router.put('/update/:id', organizationController.updateOrganization);

// delete a organizations
router.delete('/delete/:id', organizationController.deleteOrganization);

module.exports = router;
