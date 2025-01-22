import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db';
import { OkPacket } from 'mysql2';


// Interface for User (based on database schema)
interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Explicitly assert the result of INSERT query
    const [result] = await pool.query(
      'INSERT INTO Users (firstName, lastName, email, passwordHash) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword]
    ) as [OkPacket, any];

    res.status(201).json({ message: 'User registered', userID: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Explicitly assert rows as an array of User
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]) as [User[], any];

    if (!rows || rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign(
      { userID: user.userID },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
