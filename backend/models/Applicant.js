const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['GM', 'SC', 'ST', 'OBC'],
      required: true,
    },
    entryType: {
      type: String,
      enum: ['Regular', 'Lateral'],
      required: true,
    },
    quotaType: {
      type: String,
      enum: ['KCET', 'COMEDK', 'Management'],
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    documents: {
      marksCard: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified'],
        default: 'Pending',
      },
      idProof: {
        type: String,
        enum: ['Pending', 'Submitted', 'Verified'],
        default: 'Pending',
      },
    },
    status: {
      type: String,
      enum: ['Created', 'Allocated', 'Confirmed'],
      default: 'Created',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Applicant', applicantSchema)
