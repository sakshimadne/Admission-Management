const express = require('express')
const router = express.Router()

const {
  createSeatMatrix,
  getSeatMatrixByProgram,
} = require('../controllers/seatMatrixController')

const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/roleMiddleware')

// Create seat matrix (Admin only)
router.post('/', protect, authorizeRoles('Admin'), createSeatMatrix)
router.get('/:programId', protect, getSeatMatrixByProgram)

module.exports = router
