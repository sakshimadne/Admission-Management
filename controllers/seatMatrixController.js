const SeatMatrix = require('../models/SeatMatrix')
const Program = require('../models/Program')

// Create Seat Matrix (Admin only)
exports.createSeatMatrix = async (req, res) => {
  try {
    const { programId, KCET, COMEDK, Management } = req.body

    // 1️⃣ Check program exists
    const program = await Program.findById(programId)
    if (!program) {
      return res.status(404).json({ message: 'Program not found' })
    }

    // 2️⃣ Check already exists
    const existing = await SeatMatrix.findOne({ programId })
    if (existing) {
      return res
        .status(400)
        .json({ message: 'Seat matrix already created for this program' })
    }

    // 3️⃣ Validate quota sum
    const totalQuota = KCET + COMEDK + Management

    if (totalQuota !== program.intake) {
      return res.status(400).json({
        message: `Quota total (${totalQuota}) must equal program intake (${program.intake})`,
      })
    }

    // 4️⃣ Create seat matrix
    const seatMatrix = await SeatMatrix.create({
      programId,
      quotas: {
        KCET: { total: KCET },
        COMEDK: { total: COMEDK },
        Management: { total: Management },
      },
    })

    res.status(201).json(seatMatrix)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getSeatMatrixByProgram = async (req, res) => {
  try {
    const { programId } = req.params

    const seatMatrix = await SeatMatrix.findOne({ programId })

    if (!seatMatrix) {
      return res.status(404).json({ message: 'Seat matrix not found' })
    }

    res.json(seatMatrix)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
