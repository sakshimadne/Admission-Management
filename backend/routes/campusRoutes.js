// const express = require('express')
// const router = express.Router()

// const {
//   createCampus,
//   getCampuses,
//   getCampusById,
//   getCampusesByInstitution,
// } = require('../controllers/campusController')

// const { protect } = require('../middleware/authMiddleware')
// const { authorizeRoles } = require('../middleware/roleMiddleware')

// router.post('/', protect, authorizeRoles('Admin'), createCampus)


// router.get('/', protect, getCampuses)


// router.get('/:id', protect, getCampusById)


// router.get('/institution/:institutionId', protect, getCampusesByInstitution)

// module.exports = router



const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createCampus,
  getCampuses,
  getCampusById,
  getCampusesByInstitution,
} = require("../controllers/campusController");

// Create Campus
router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createCampus
);

// Get all campuses
router.get(
  "/",
  protect,
  authorizeRoles("Admin"),
  getCampuses
);

// Get by ID
router.get(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  getCampusById
);

// Get by Institution
router.get(
  "/institution/:institutionId",
  protect,
  authorizeRoles("Admin"),
  getCampusesByInstitution
);

module.exports = router;