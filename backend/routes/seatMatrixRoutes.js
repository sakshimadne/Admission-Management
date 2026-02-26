// const express = require('express')
// const router = express.Router()

// const {
//   createSeatMatrix,
//   getSeatMatrixByProgram,
// } = require('../controllers/seatMatrixController')

// const { protect } = require('../middleware/authMiddleware')
// const { authorizeRoles } = require('../middleware/roleMiddleware')

// router.post('/', protect, authorizeRoles('Admin'), createSeatMatrix)
// router.get('/:programId', protect, getSeatMatrixByProgram)

// module.exports = router



const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createSeatMatrix,
  getSeatMatrixByProgram,
} = require("../controllers/seatMatrixController");

router.post(
  "/",
  protect,
  authorizeRoles("Admin"),
  createSeatMatrix
);

router.get(
  "/:programId",
  protect,
  authorizeRoles("Admin"),
  getSeatMatrixByProgram
);

module.exports = router;