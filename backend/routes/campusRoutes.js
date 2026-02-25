const express = require('express')
const router = express.Router()

const {
  createCampus,
  getCampuses,
  getCampusById,
  getCampusesByInstitution,
} = require('../controllers/campusController')

const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/roleMiddleware')

// Create campus (Admin only)
router.post('/', protect, authorizeRoles('Admin'), createCampus)

// Get all campuses
router.get('/', protect, getCampuses)

// Get campus by ID
router.get('/:id', protect, getCampusById)

// Get campuses by institution
router.get('/institution/:institutionId', protect, getCampusesByInstitution)

module.exports = router
