import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { CreateCompanyRootDto } from 'src/auth/dto/create-company-root.dto';
import { CreateCompanyUserDto } from 'src/auth/dto/create-company-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/register-company-root')
  createCompanyRoot(@Body() dto: CreateCompanyRootDto) {
    return this.authService.createCompanyRoot(dto);
  }

  @Post('/register-company-user')
  createCompanyUser(@Body() dto: CreateCompanyUserDto) {
    return this.authService.createCompanyUser(dto);
  }
}
