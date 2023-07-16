const Organization = require('../models/Organization');
const Employee = require('../models/Employee');

// Get all employees for a specific organization
exports.getEmployees = async (req, res) => {
  const { organizationId } = req.params;

  try {
    const organization = await Organization.findById(organizationId).populate('employees');
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const employees = organization.employees;
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new employee for a specific organization
exports.createEmployee = async (req, res) => {
  const { organizationId } = req.params;
  const { name, dob, phoneNumber, address } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const employee = new Employee({
      name,
      dob,
      phoneNumber,
      address,
      organization: organizationId,
    });
    await employee.save();

    organization.employees.push(employee);
    organization.numberOfEmployees += 1;
    await organization.save();

    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  const { organizationId, id } = req.params;
  const { name, dob, phoneNumber, address } = req.body;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, dob, phoneNumber, address },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  const { organizationId, id } = req.params;

  try {
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const employee = await Employee.findByIdAndRemove(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    organization.employees.pull(employee);
    organization.numberOfEmployees -= 1;
    await organization.save();

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
