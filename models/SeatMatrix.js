const mongoose = require('mongoose')

const seatMatrixSchema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
      unique: true, // One seat matrix per program
    },
    quotas: {
      KCET: {
        total: { type: Number, required: true },
        filled: { type: Number, default: 0 },
      },
      COMEDK: {
        total: { type: Number, required: true },
        filled: { type: Number, default: 0 },
      },
      Management: {
        total: { type: Number, required: true },
        filled: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('SeatMatrix', seatMatrixSchema)
