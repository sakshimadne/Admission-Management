// const express = require('express')
// const router = express.Router()

// const {
//   getDashboardSummary,
//   getSeatAvailability,
// } = require('../controllers/dashboardController')
// const { protect } = require('../middleware/authMiddleware')

// router.get('/summary', protect, getDashboardSummary)
// router.get('/seats', protect, getSeatAvailability)
// module.exports = router


const express = require("express");
const router = express.Router();

const {
  getDashboardSummary,
  getSeatAvailability,
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
  "/summary",
  protect,
  authorizeRoles("Admin", "Management"),
  getDashboardSummary
);

router.get(
  "/seats",
  protect,
  authorizeRoles("Admin", "Management"),
  getSeatAvailability
);

module.exports = router;