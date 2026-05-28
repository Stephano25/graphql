import jwt from 'jsonwebtoken';
import { findUserById } from '../data/database';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user: any): string => {
  const payload = {
    userId: user.id,
    email: user.email
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const getUserFromToken = (token: string): any | null => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = findUserById(decoded.userId);
    return user || null;
  } catch (error) {
    return null;
  }
};