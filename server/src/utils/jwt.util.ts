import jwt from 'jsonwebtoken';
import { config } from '../env.config';

interface TokenPayload {
  id: string;
  isRefreshToken?: boolean;
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT token
 * @param id - User ID
 * @param expiresIn - Expiration time in seconds or string (e.g., '15m', '1h')
 * @param isRefreshToken - Whether this is a refresh token
 */
export const generateToken = (
  id: string, 
  expiresIn: string | number = '15m', 
  isRefreshToken: boolean = false
): string => {
  const payload: TokenPayload = { id };
  
  if (isRefreshToken) {
    payload.isRefreshToken = true;
  }

  // Convert expiresIn to a string with 's' suffix if it's a number
  const expiresInStr = typeof expiresIn === 'number' ? `${expiresIn}s` : expiresIn;
  
  // Create a new object with the correct type
  const options: jwt.SignOptions = {};
  // @ts-ignore - We know this is a valid option
  options.expiresIn = expiresInStr;
  
  return jwt.sign(payload, config.JWT_SECRET as string, options);
};

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @param isRefreshToken - Whether to verify as a refresh token
 */
export const verifyToken = (token: string, isRefreshToken: boolean = false): TokenPayload => {
  const decoded = jwt.verify(token, config.JWT_SECRET as string) as TokenPayload;
  
  if (isRefreshToken && !decoded.isRefreshToken) {
    throw new Error('Invalid token type');
  }
  
  if (!decoded.id) {
    throw new Error('Invalid token payload');
  }

  return decoded;
};

/**
 * Generate both access and refresh tokens
 */
export const generateAuthTokens = (userId: string) => {
  const accessToken = generateToken(userId, '15m'); // 15 minutes
  const refreshToken = generateToken(userId, '7d', true); // 7 days
  
  return { accessToken, refreshToken };
};
