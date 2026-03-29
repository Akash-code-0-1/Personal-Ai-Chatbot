import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const TOKEN_EXPIRY = '7d';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

export async function getCurrentUserId(): Promise<string | null> {
  const token = await getAuthToken();
  if (!token) return null;
  const decoded = verifyToken(token);
  return decoded?.userId || null;
}
