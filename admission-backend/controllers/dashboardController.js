const Program = require('../models/Program')
const SeatMatrix = require('../models/SeatMatrix')

const Applicant = require('../models/Applicant')
const Admission = require('../models/Admission')

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalApplicants = await Applicant.countDocuments()
    const totalAdmissions = await Admission.countDocuments()
    const confirmedAdmissions = await Admission.countDocuments({
      confirmed: true,
    })
    const pendingAdmissions = await Admission.countDocuments({
      confirmed: false,
    })

    res.json({
      totalApplicants,
      totalAdmissions,
      confirmedAdmissions,
      pendingAdmissions,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getSeatAvailability = async (req, res) => {
  try {
    const programs = await Program.find()

    const result = []

    for (let program of programs) {
      const seatMatrix = await SeatMatrix.findOne({
        programId: program._id,
      })

      if (!seatMatrix) continue

      const KCET = seatMatrix.quotas.KCET
      const COMEDK = seatMatrix.quotas.COMEDK
      const Management = seatMatrix.quotas.Management

      const totalFilled = KCET.filled + COMEDK.filled + Management.filled

      const totalRemaining =
        KCET.total + COMEDK.total + Management.total - totalFilled

      result.push({
        programName: program.name,
        intake: program.intake,
        KCET: {
          total: KCET.total,
          filled: KCET.filled,
          remaining: KCET.total - KCET.filled,
        },
        COMEDK: {
          total: COMEDK.total,
          filled: COMEDK.filled,
          remaining: COMEDK.total - COMEDK.filled,
        },
        Management: {
          total: Management.total,
          filled: Management.filled,
          remaining: Management.total - Management.filled,
        },
        totalFilled,
        totalRemaining,
      })
    }

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
