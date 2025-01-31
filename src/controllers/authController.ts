import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db'; // Ensure this path matches your DB configuration

interface User {
    id: number;
    email: string;
    password: string;
    // Add other user fields if needed
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        // Query the database to find the user by email
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]) as unknown as [User[]];

        const user = users[0]; // Now we know `users` is an array of `User` objects

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
