import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a custom request type to include 'user'
export interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with your actual user type if available
}

// Correctly define middleware as Express RequestHandler
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return; // Ensure we return after sending response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Attach decoded user to req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
    return; // Ensure we return after sending response
  }
};

export { authMiddleware };
