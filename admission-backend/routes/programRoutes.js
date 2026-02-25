const express = require('express')
const router = express.Router()

const {
  createProgram,
  getPrograms,
  getProgramById,
  getProgramsByDepartment,
} = require('../controllers/programController')

const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/roleMiddleware')

// Create Program (Admin only)
router.post('/', protect, authorizeRoles('Admin'), createProgram)

// Get all programs
router.get('/', protect, getPrograms)

// Get programs by department
router.get('/department/:departmentId', protect, getProgramsByDepartment)

// Get program by id
router.get('/:id', protect, getProgramById)

module.exports = router
