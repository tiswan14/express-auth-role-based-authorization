import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        })

        await newUser.save()

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        )

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {}
}
