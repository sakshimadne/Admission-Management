const Admission = require('../models/Admission')
const Applicant = require('../models/Applicant')
const SeatMatrix = require('../models/SeatMatrix')
const Program = require('../models/Program')

exports.allocateSeat = async (req, res) => {
  try {
    const { applicantId, programId, quotaType, allotmentNumber } = req.body

    // 1️⃣ Check applicant
    const applicant = await Applicant.findById(applicantId)
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' })
    }

    if (applicant.status !== 'Created') {
      return res.status(400).json({ message: 'Applicant already allocated' })
    }

    // 2️⃣ Check seat matrix
    const seatMatrix = await SeatMatrix.findOne({ programId })
    if (!seatMatrix) {
      return res.status(404).json({ message: 'Seat matrix not found' })
    }

    const quota = seatMatrix.quotas[quotaType]

    if (!quota) {
      return res.status(400).json({ message: 'Invalid quota type' })
    }

    // 3️⃣ Check availability
    if (quota.filled >= quota.total) {
      return res.status(400).json({ message: 'Quota full' })
    }

    // 4️⃣ Increment seat
    quota.filled += 1
    await seatMatrix.save()

    // 5️⃣ Update applicant status
    applicant.status = 'Allocated'
    await applicant.save()

    // 6️⃣ Create admission record
    const admission = await Admission.create({
      applicantId,
      programId,
      quotaType,
      allotmentNumber,
    })

    res.status(201).json(admission)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getAdmissions = async (req, res) => {
  try {
    const { confirmed, feeStatus, quotaType, programId } = req.query

    const filter = {}

    if (confirmed !== undefined) {
      filter.confirmed = confirmed === 'true'
    }

    if (feeStatus) {
      filter.feeStatus = feeStatus
    }

    if (quotaType) {
      filter.quotaType = quotaType
    }

    if (programId) {
      filter.programId = programId
    }

    const admissions = await Admission.find(filter)
      .populate('applicantId')
      .populate('programId')

    res.json(admissions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.updateFeeStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { feeStatus } = req.body

    const admission = await Admission.findById(id)

    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' })
    }

    admission.feeStatus = feeStatus
    await admission.save()

    res.json(admission)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.confirmAdmission = async (req, res) => {
  try {
    const { id } = req.params

    const admission = await Admission.findById(id)

    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' })
    }

    if (admission.feeStatus !== 'Paid') {
      return res.status(400).json({ message: 'Fee not paid' })
    }

    if (admission.confirmed) {
      return res.status(400).json({ message: 'Already confirmed' })
    }

    const count = await Admission.countDocuments({ confirmed: true })

    const year = new Date().getFullYear()

    const admissionNumber = `ADM-${year}-${(count + 1)
      .toString()
      .padStart(4, '0')}`

    admission.confirmed = true
    admission.admissionNumber = admissionNumber

    await admission.save()

 
    await Applicant.findByIdAndUpdate(
      admission.applicantId,
      { status: 'Confirmed' }
    )

    res.json(admission)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
