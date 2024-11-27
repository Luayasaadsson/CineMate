import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/userModel'
import { validateAndHashPassword } from '../utils/validators'

// Registration function
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body

  try {
    const { error, hashedPassword } = await validateAndHashPassword(password)
    if (error) {
      res.status(400).json({ message: error })
      return
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'Email address is already registered' })
      return
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Login function
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    )

    res.status(200).json({ token, name: user.name })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
