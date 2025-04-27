import express from 'express'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
    res.send('Admin Page')
})

router.get(
    '/manager',
    verifyToken,
    authorizeRole('admin', 'manager'),
    (req, res) => {
        res.send('Manager Page')
    }
)

router.get(
    '/user',
    verifyToken,
    authorizeRole('admin', 'manager', 'user'),
    (req, res) => {
        res.json({ message: 'User Page' })
    }
)

export default router
