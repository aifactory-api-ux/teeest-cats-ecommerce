import { Controller, Post, Get, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, UserResponse, AuthResponse } from '../shared/dtos/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  async getMe(@Headers('authorization') authHeader: string): Promise<UserResponse> {
    const token = authHeader?.replace('Bearer ', '');
    return this.authService.getMe(token);
  }
}