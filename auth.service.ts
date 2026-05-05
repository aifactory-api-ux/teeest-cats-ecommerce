import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto, UserResponse, AuthResponse, User } from '../shared/dtos/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private users: Map<string, User> = new Map();

  async register(createUserDto: CreateUserDto): Promise<UserResponse> {
    const existingUser = Array.from(this.users.values()).find(
      u => u.email === createUserDto.email
    );

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const now = new Date().toISOString();
    const user: User = {
      id: uuidv4(),
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: this.hashPassword(createUserDto.password),
      address: createUserDto.address,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(user.id, user);

    const { passwordHash, ...response } = user;
    return response as UserResponse;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = Array.from(this.users.values()).find(
      u => u.email === loginDto.email
    );

    if (!user || !this.verifyPassword(loginDto.password, user.passwordHash)) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    const { passwordHash, ...userResponse } = user;

    return {
      accessToken,
      refreshToken,
      user: userResponse as UserResponse,
    };
  }

  async getMe(token: string): Promise<UserResponse> {
    const payload = this.decodeToken(token);
    const user = this.users.get(payload.id);

    if (!user) {
      throw new Error('User not found');
    }

    const { passwordHash, ...response } = user;
    return response as UserResponse;
  }

  private hashPassword(password: string): string {
    return Buffer.from(password).toString('base64');
  }

  private verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }

  private generateToken(user: User): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({
      id: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })).toString('base64');
    const signature = Buffer.from(`${header}.${payload}.secret`).toString('base64');
    return `${header}.${payload}.${signature}`;
  }

  private generateRefreshToken(user: User): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({
      id: user.id,
      email: user.email,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 604800,
    })).toString('base64');
    const signature = Buffer.from(`${header}.${payload}.secret`).toString('base64');
    return `${header}.${payload}.${signature}`;
  }

  private decodeToken(token: string): { id: string; email: string } {
    try {
      const [, payload] = token.split('.');
      return JSON.parse(Buffer.from(payload, 'base64').toString());
    } catch {
      throw new Error('Invalid token');
    }
  }
}