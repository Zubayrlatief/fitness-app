import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// Define a custom request type to include 'user'
export interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with your actual user type if available
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Attach decoded user to req
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export { authMiddleware };
