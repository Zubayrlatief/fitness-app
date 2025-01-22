import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO Users (firstName, lastName, email, passwordHash) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', userID: (result as any).insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

        if ((rows as any[]).length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const user = (rows as any[])[0];
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
