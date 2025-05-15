import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JwtPayload } from '../types/JwtPayload';

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization header missing' });
  } else {
    const token = authHeader.replace('Bearer ', '');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  
      req.user = decoded.user;
  
      next();
    } catch (error) {
      console.error('Token authentication failed', error);
      res.status(401).json({ error: 'Nieprawidłowy lub wygasły token' });
    }
  }
};