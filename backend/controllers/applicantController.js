const Admission = require('../models/Admission')
const Applicant = require('../models/Applicant')
const mongoose = require('mongoose')

// Create Applicant (Admission Officer or Admin)
exports.createApplicant = async (req, res) => {
  try {
    const { name, email, phone, category, entryType, quotaType, marks } =
      req.body

    if (
      !name ||
      !email ||
      !phone ||
      !category ||
      !entryType ||
      !quotaType ||
      marks === undefined
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const applicant = await Applicant.create({
      name,
      email,
      phone,
      category,
      entryType,
      quotaType,
      marks,
    })

    res.status(201).json(applicant)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Applicants
exports.getApplicants = async (req, res) => {
  try {
    const { status, quotaType, category } = req.query

    const filter = {}

    if (status) filter.status = status
    if (quotaType) filter.quotaType = quotaType
    if (category) filter.category = category

    const applicants = await Applicant.find(filter)

    res.json(applicants)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Applicant by ID
exports.getApplicantById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' })
    }

    const applicant = await Applicant.findById(id)

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' })
    }

    res.json(applicant)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getAdmissions = async (req, res) => {
  try {
    const { confirmed, feeStatus } = req.query

    const filter = {}

    if (confirmed !== undefined) {
      filter.confirmed = confirmed === 'true'
    }

    if (feeStatus) {
      filter.feeStatus = feeStatus
    }

    const admissions = await Admission.find(filter)
      .populate('applicantId', 'name email')
      .populate('programId', 'name')

    res.json(admissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// Update Document Status
exports.updateDocuments = async (req, res) => {
  try {
    const { id } = req.params
    const { marksCard, idProof } = req.body

    const applicant = await Applicant.findById(id)
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' })
    }

    if (marksCard) applicant.documents.marksCard = marksCard
    if (idProof) applicant.documents.idProof = idProof

    await applicant.save()

    res.json(applicant)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
