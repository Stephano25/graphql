import jwt from 'jsonwebtoken';
import { User, JWTPayload } from '../types/index.js';
import { findUserById } from '../data/database.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user: User): string => {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const getUserFromToken = (token: string): User | null => {
  try {
    if (!token) return null;
    
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const user = findUserById(decoded.userId);
    return user || null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};