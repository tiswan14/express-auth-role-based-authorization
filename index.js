import express from 'express'
import dotenv from 'dotenv'
import dbConnect from './config/dbConnect.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

dbConnect()

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 7002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
