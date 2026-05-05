import { AuthService } from '../auth-service/auth.service';
import { CreateUserDto, LoginDto } from '../shared/dtos/user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        address: '123 Test St',
      };

      const result = await authService.register(createUserDto);

      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
      expect(result.name).toBe(createUserDto.name);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.passwordHash).toBeUndefined();
    });

    it('should throw error when registering with existing email', async () => {
      const createUserDto: CreateUserDto = {
        email: 'existing@example.com',
        name: 'Test User',
        password: 'password123',
        address: '123 Test St',
      };

      await authService.register(createUserDto);

      await expect(authService.register(createUserDto)).rejects.toThrow(
        'User with this email already exists',
      );
    });

    it('should hash password on registration', async () => {
      const createUserDto: CreateUserDto = {
        email: 'hashtest@example.com',
        name: 'Test User',
        password: 'mypassword',
        address: '123 Test St',
      };

      const result = await authService.register(createUserDto);

      expect(result.passwordHash).toBeUndefined();
      const storedUser = (authService as any).users.get(result.id);
      expect(storedUser.passwordHash).toBeDefined();
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const createUserDto: CreateUserDto = {
        email: 'login@example.com',
        name: 'Test User',
        password: 'password123',
        address: '123 Test St',
      };

      await authService.register(createUserDto);

      const loginDto: LoginDto = {
        email: 'login@example.com',
        password: 'password123',
      };

      const result = await authService.login(loginDto);

      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(createUserDto.email);
    });

    it('should throw error with invalid email', async () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      await expect(authService.login(loginDto)).rejects.toThrow('Invalid credentials');
    });

    it('should throw error with invalid password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'wrongpass@example.com',
        name: 'Test User',
        password: 'correctpassword',
        address: '123 Test St',
      };

      await authService.register(createUserDto);

      const loginDto: LoginDto = {
        email: 'wrongpass@example.com',
        password: 'wrongpassword',
      };

      await expect(authService.login(loginDto)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('getMe', () => {
    it('should return user data for valid token', async () => {
      const createUserDto: CreateUserDto = {
        email: 'me@example.com',
        name: 'Test User',
        password: 'password123',
        address: '123 Test St',
      };

      await authService.register(createUserDto);
      const loginResult = await authService.login({
        email: 'me@example.com',
        password: 'password123',
      });

      const result = await authService.getMe(loginResult.accessToken);

      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
      expect(result.id).toBeDefined();
    });

    it('should throw error for invalid token', async () => {
      await expect(authService.getMe('invalid.token.here')).rejects.toThrow('Invalid token');
    });

    it('should throw error when user not found', async () => {
      const loginResult = await authService.login({
        email: 'me@example.com',
        password: 'password123',
      });

      (authService as any).users.clear();

      await expect(authService.getMe(loginResult.accessToken)).rejects.toThrow('User not found');
    });
  });

  describe('token generation', () => {
    it('should generate access token with correct structure', async () => {
      const createUserDto: CreateUserDto = {
        email: 'token@example.com',
        name: 'Test User',
        password: 'password123',
        address: '123 Test St',
      };

      await authService.register(createUserDto);
      const loginResult = await authService.login({
        email: 'token@example.com',
        password: 'password123',
      });

      const tokenParts = loginResult.accessToken.split('.');
      expect(tokenParts).toHaveLength(3);
    });

    it('should generate different access and refresh tokens', async () => {
      const createUserDto: CreateUserDto = {
        email: 'diff@example.com',
        name: 'Test User',
        password: 'password123',
        address: '123 Test St',
      };

      await authService.register(createUserDto);
      const loginResult = await authService.login({
        email: 'diff@example.com',
        password: 'password123',
      });

      expect(loginResult.accessToken).not.toBe(loginResult.refreshToken);
    });
  });
});