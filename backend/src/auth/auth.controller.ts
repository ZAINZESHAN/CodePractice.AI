import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../common/dto/auth.dto';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateCompanyRootDto } from 'src/common/dto/create-company-root.dto';
import { CreateCompanyUserDto } from 'src/common/dto/create-company-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('/admin/login')
  loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginAdmin(dto)
  }

  @Post('/create-company-root')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createCompanyRoot(@Body() dto: CreateCompanyRootDto) {
    return this.authService.createCompanyRoot(dto);
  }

  @Post('/create-company-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY_ROOT)
  createCompanyUser(@Body() dto: CreateCompanyUserDto) {
    return this.authService.createCompanyUser(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
