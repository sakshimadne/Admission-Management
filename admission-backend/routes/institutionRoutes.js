const express = require('express')
const router = express.Router()

const {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  getFullStructure,
} = require('../controllers/institutionController')

const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/roleMiddleware')

// Create Institution (Admin only)
router.post('/', protect, authorizeRoles('Admin'), createInstitution)

// Get full structure  ✅ move this up
router.get('/full-structure', protect, getFullStructure)

// Get all Institutions
router.get('/', protect, getInstitutions)

// Get Institution by ID
router.get('/:id', protect, getInstitutionById)

module.exports = router
