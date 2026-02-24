const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campus',
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Department', departmentSchema)
