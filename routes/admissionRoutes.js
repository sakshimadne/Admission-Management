const express = require('express')
const router = express.Router()

const {
  allocateSeat,
  updateFeeStatus,
  confirmAdmission,
} = require('../controllers/admissionController')
const { protect } = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/roleMiddleware')
const { getAdmissions } = require('../controllers/admissionController')

router.get('/', protect, getAdmissions)
router.post(
  '/allocate',
  protect,
  authorizeRoles('Admin', 'AdmissionOfficer'),
  allocateSeat,
)
router.put(
  '/:id/fee',
  protect,
  authorizeRoles('Admin', 'AdmissionOfficer'),
  updateFeeStatus,
)
router.put('/:id/confirm', protect, authorizeRoles('Admin'), confirmAdmission)
module.exports = router
