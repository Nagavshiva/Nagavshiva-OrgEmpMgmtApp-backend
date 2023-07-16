const Organization = require('../models/Organization');
const Employee = require('../models/Employee');

// Get all organizations
exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate('employees');
    res.json(organizations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an organization by ID
exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).populate('employees');
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const existingOrganization = await Organization.findOne({ name: req.body.name });
    if (existingOrganization) {
      return res.status(400).json({ message: 'Organization already exists' });
    }

    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json(organization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an organization
exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an organization
exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Update related employees
    await Employee.updateMany(
      { organization: req.params.id },
      { $unset: { organization: '' } }
    );
    res.json({ message: 'Organization deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
