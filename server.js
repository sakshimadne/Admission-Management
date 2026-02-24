// server.js

const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const institutionRoutes = require('./routes/institutionRoutes')
const campusRoutes = require('./routes/campusRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const programRoutes = require('./routes/programRoutes')
const seatMatrixRoutes = require('./routes/seatMatrixRoutes')
const applicantRoutes = require('./routes/applicantRoutes')
const admissionRoutes = require('./routes/admissionRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/institutions', institutionRoutes)
app.use('/api/campuses', campusRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/programs', programRoutes)
app.use('/api/seat-matrix', seatMatrixRoutes)
app.use('/api/applicants', applicantRoutes)
app.use('/api/admissions', admissionRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.get('/', (req, res) => {
  res.send('Admission CRM API Running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
