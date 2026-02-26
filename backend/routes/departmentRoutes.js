// const express = require('express')
// const router = express.Router()

// const {
//   createDepartment,
//   getDepartments,
//   getDepartmentById,
//   getDepartmentsByCampus,
// } = require('../controllers/departmentController')

// const { protect } = require('../middleware/authMiddleware')
// const { authorizeRoles } = require('../middleware/roleMiddleware')


// router.post('/', protect, authorizeRoles('Admin'), createDepartment)


// router.get('/', protect, getDepartments)


// router.get('/campus/:campusId', protect, getDepartmentsByCampus)


// router.get('/:id', protect, getDepartmentById)

// module.exports = router



const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getDepartmentsByCampus,
} = require("../controllers/departmentController");

router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createDepartment
);

router.get(
  "/",
  protect,
  authorizeRoles("Admin"),
  getDepartments
);

router.get(
  "/campus/:campusId",
  protect,
  authorizeRoles("Admin"),
  getDepartmentsByCampus
);

router.get(
  "/:id",
  protect,
  authorizeRoles("Admin"),
  getDepartmentById
);

module.exports = router;