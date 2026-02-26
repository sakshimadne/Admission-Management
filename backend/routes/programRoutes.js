// const express = require('express')
// const router = express.Router()

// const {
//   createProgram,
//   getPrograms,
//   getProgramById,
//   getProgramsByDepartment,
// } = require('../controllers/programController')

// const { protect } = require('../middleware/authMiddleware')
// const { authorizeRoles } = require('../middleware/roleMiddleware')


// router.post('/', protect, authorizeRoles('Admin'), createProgram)


// router.get('/', protect, getPrograms)


// router.get('/department/:departmentId', protect, getProgramsByDepartment)

// router.get('/:id', protect, getProgramById)

// module.exports = router



const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createProgram,
  getPrograms,
  getProgramById,
  getProgramsByDepartment,
} = require("../controllers/programController");

router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createProgram
);

router.get(
  "/",
  protect,
  authorizeRoles("Admin"),
  getPrograms
);

router.get(
  "/department/:departmentId",
  protect,
  authorizeRoles("Admin"),
  getProgramsByDepartment
);

router.get(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  getProgramById
);

module.exports = router;