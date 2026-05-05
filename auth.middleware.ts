import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles?: string[];
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid authorization format' });
    }

    try {
      const decoded = this.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

  private verifyToken(token: string): { id: string; email: string; roles?: string[] } {
    const payload = Buffer.from(token.split('.')[1], 'base64').toString();
    return JSON.parse(payload);
  }
}

export function extractUserFromToken(token: string): { id: string; email: string; roles?: string[] } {
  const payload = Buffer.from(token.split('.')[1], 'base64').toString();
  return JSON.parse(payload);
}
