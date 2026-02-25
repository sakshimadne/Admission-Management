const express = require('express')
const router = express.Router()

const {
  getDashboardSummary,
  getSeatAvailability,
} = require('../controllers/dashboardController')
const { protect } = require('../middleware/authMiddleware')

router.get('/summary', protect, getDashboardSummary)
router.get('/seats', protect, getSeatAvailability)
module.exports = router
