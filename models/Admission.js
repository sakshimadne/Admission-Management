const mongoose = require('mongoose')

const admissionSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Applicant',
      required: true,
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    quotaType: {
      type: String,
      enum: ['KCET', 'COMEDK', 'Management'],
      required: true,
    },
    allotmentNumber: {
      type: String,
    },
    feeStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    admissionNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Admission', admissionSchema)
