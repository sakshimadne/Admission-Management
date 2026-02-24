const Program = require('../models/Program')
const Department = require('../models/Department')
const mongoose = require('mongoose')

// Create Program (Admin only)
exports.createProgram = async (req, res) => {
  try {
    const {
      name,
      code,
      departmentId,
      academicYear,
      courseType,
      entryType,
      intake,
    } = req.body

    if (
      !name ||
      !code ||
      !departmentId ||
      !academicYear ||
      !courseType ||
      !entryType ||
      !intake
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Validate department exists
    const department = await Department.findById(departmentId)
    if (!department) {
      return res.status(404).json({ message: 'Department not found' })
    }

    const program = await Program.create({
      name,
      code,
      departmentId,
      academicYear,
      courseType,
      entryType,
      intake,
    })

    res.status(201).json(program)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate(
      'departmentId',
      'name campusId',
    )
    res.json(programs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Program by ID
exports.getProgramById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' })
    }

    const program = await Program.findById(id).populate('departmentId', 'name')

    if (!program) {
      return res.status(404).json({ message: 'Program not found' })
    }

    res.json(program)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get Programs by Department
exports.getProgramsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params

    const programs = await Program.find({ departmentId })
    res.json(programs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
