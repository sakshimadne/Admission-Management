const Institution = require('../models/Institution')
const Campus = require('../models/Campus')
const Department = require('../models/Department')
const Program = require('../models/Program')

exports.getFullStructure = async (req, res) => {
  try {
    const institutions = await Institution.find()

    const result = []

    for (let institution of institutions) {
      const campuses = await Campus.find({
        institutionId: institution._id,
      })

      const campusData = []

      for (let campus of campuses) {
        const departments = await Department.find({
          campusId: campus._id,
        })

        const departmentData = []

        for (let department of departments) {
          const programs = await Program.find({
            departmentId: department._id,
          })

          departmentData.push({
            ...department.toObject(),
            programs,
          })
        }

        campusData.push({
          ...campus.toObject(),
          departments: departmentData,
        })
      }

      result.push({
        ...institution.toObject(),
        campuses: campusData,
      })
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// Create Institution
exports.createInstitution = async (req, res) => {
  try {
    const { name, code } = req.body

    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' })
    }

    const existing = await Institution.findOne({ code })
    if (existing) {
      return res.status(400).json({ message: 'Institution already exists' })
    }

    const institution = await Institution.create({ name, code })

    res.status(201).json(institution)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Institutions (helpful for dropdowns later)
exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find()
    res.json(institutions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id)

    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' })
    }

    res.json(institution)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
