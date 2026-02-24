const mongoose = require('mongoose')

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      enum: ['UG', 'PG'],
      required: true,
    },
    entryType: {
      type: String,
      enum: ['Regular', 'Lateral'],
      required: true,
    },
    intake: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Program', programSchema)
