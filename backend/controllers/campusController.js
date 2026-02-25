const Campus = require('../models/Campus')
const Institution = require('../models/Institution')
const mongoose = require('mongoose')

// Create Campus (Admin only)
exports.createCampus = async (req, res) => {
  try {
    const { name, institutionId } = req.body

    if (!name || !institutionId) {
      return res
        .status(400)
        .json({ message: 'Name and institutionId required' })
    }

    // Validate institution exists
    const institution = await Institution.findById(institutionId)
    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' })
    }

    const campus = await Campus.create({ name, institutionId })

    res.status(201).json(campus)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Campuses
exports.getCampuses = async (req, res) => {
  try {
    const campuses = await Campus.find().populate('institutionId', 'name code')
    res.json(campuses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Campus by ID
exports.getCampusById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' })
    }

    const campus = await Campus.findById(id).populate(
      'institutionId',
      'name code',
    )

    if (!campus) {
      return res.status(404).json({ message: 'Campus not found' })
    }

    res.json(campus)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Campuses by Institution
exports.getCampusesByInstitution = async (req, res) => {
  try {
    const { institutionId } = req.params

    const campuses = await Campus.find({ institutionId })

    res.json(campuses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
