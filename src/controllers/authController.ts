import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if the email already exists
        const [existingUser] = await db.execute(
            'SELECT * FROM Users WHERE email = ?', [email]
        );

        if ((existingUser as any[]).length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const [result] = await db.execute(
            'INSERT INTO Users (firstName, lastName, email, passwordHash) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const [users] = await db.execute(
            'SELECT * FROM Users WHERE email = ?', [email]
        );

        const user = (users as any[])[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
