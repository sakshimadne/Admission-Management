const Department = require('../models/Department')
const Campus = require('../models/Campus')
const mongoose = require('mongoose')

// Create Department (Admin only)
exports.createDepartment = async (req, res) => {
  try {
    const { name, campusId } = req.body

    if (!name || !campusId) {
      return res.status(400).json({ message: 'Name and campusId required' })
    }

    // Validate campus exists
    const campus = await Campus.findById(campusId)
    if (!campus) {
      return res.status(404).json({ message: 'Campus not found' })
    }

    const department = await Department.create({ name, campusId })

    res.status(201).json(department)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate(
      'campusId',
      'name institutionId',
    )
    res.json(departments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' })
    }

    const department = await Department.findById(id).populate(
      'campusId',
      'name',
    )

    if (!department) {
      return res.status(404).json({ message: 'Department not found' })
    }

    res.json(department)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Departments by Campus
exports.getDepartmentsByCampus = async (req, res) => {
  try {
    const { campusId } = req.params

    const departments = await Department.find({ campusId })

    res.json(departments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
