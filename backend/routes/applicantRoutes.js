// const express = require('express')
// const router = express.Router()

// const {
//   createApplicant,
//   getApplicants,
//   getApplicantById,
//   updateDocuments,
//   getAdmissions,
// } = require('../controllers/applicantController')

// const { protect } = require('../middleware/authMiddleware')
// const { authorizeRoles } = require('../middleware/roleMiddleware')

// // Create Applicant (Admission Officer or Admin)
// router.post(
//   '/',
//   protect,
//   authorizeRoles('Admin', 'AdmissionOfficer'),
//   createApplicant,
// )

// router.post(
//   '/',
//   protect,
//   authorizeRoles('Admin', 'AdmissionOfficer'),
//   createApplicant,
// )
// router.get('/', protect, getApplicants)
// router.get('/:id', protect, getApplicantById)
// router.put(
//   '/:id/documents',
//   protect,
//   authorizeRoles('Admin', 'AdmissionOfficer'),
//   updateDocuments,
// )
// module.exports = router



const express = require("express");
const router = express.Router();

const {
  createApplicant,
  getApplicants,
  getApplicantById,
  updateDocuments,
} = require("../controllers/applicantController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("Admin", "AdmissionOfficer"),
  createApplicant
);

router.get(
  "/",
  protect,
  authorizeRoles("Admin", "AdmissionOfficer"),
  getApplicants
);

router.get(
  "/:id",
  protect,
  authorizeRoles("Admin", "AdmissionOfficer"),
  getApplicantById
);

router.put(
  "/:id/documents",
  protect,
  authorizeRoles("Admin", "AdmissionOfficer"),
  updateDocuments
);

module.exports = router;