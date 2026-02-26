// const express = require('express')
// const router = express.Router()

// const {
//   createInstitution,
//   getInstitutions,
//   getInstitutionById,
//   getFullStructure,
// } = require('../controllers/institutionController')

// const { protect } = require('../middleware/authMiddleware')
// const { authorizeRoles } = require('../middleware/roleMiddleware')


// router.post('/', protect, authorizeRoles('Admin'), createInstitution)


// router.get('/full-structure', protect, getFullStructure)

// router.get('/', protect, getInstitutions)

// router.get('/:id', protect, getInstitutionById)

// module.exports = router



const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  getFullStructure,
} = require("../controllers/institutionController");

// Create Institution
router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createInstitution
);

// Get all institutions
router.get(
  "/",
  protect,
  authorizeRoles("Admin"),
  getInstitutions
);

// Get full hierarchy
router.get(
  "/full-structure",
  protect,
  authorizeRoles("Admin"),
  getFullStructure
);

// Get by ID
router.get(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  getInstitutionById
);

module.exports = router;