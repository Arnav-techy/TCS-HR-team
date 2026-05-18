const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { validateEmployee } = require('../middleware/validateEmployee');
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// All routes are protected
router.use(protect);

// POST /api/employees - Create employee
router.post('/', validateEmployee, createEmployee);

// GET /api/employees - Get all employees (supports ?department=X&search=Y&sort=Z)
router.get('/', getAllEmployees);

// GET /api/employees/:id - Get single employee
router.get('/:id', getEmployeeById);

// PUT /api/employees/:id - Update employee
router.put('/:id', updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', deleteEmployee);

module.exports = router;
