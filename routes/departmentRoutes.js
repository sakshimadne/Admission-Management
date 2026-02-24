const express = require('express')
const router = express.Router()

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getDepartmentsByCampus,
} = require('../controllers/departmentController')

const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/roleMiddleware')

// Create Department (Admin only)
router.post('/', protect, authorizeRoles('Admin'), createDepartment)

// Get all departments
router.get('/', protect, getDepartments)

// Get by campus
router.get('/campus/:campusId', protect, getDepartmentsByCampus)

// Get by id
router.get('/:id', protect, getDepartmentById)

module.exports = router
