import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include the user property
interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with a specific type if you have a User interface
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Now TypeScript recognizes 'user' on req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
