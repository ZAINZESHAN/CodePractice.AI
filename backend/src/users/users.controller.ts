import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/guards/roles.guards';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('students')
  @Roles(Role.ADMIN, Role.COMPANY_ROOT)
  async getAllStudents() {
    return this.usersService.getAllStudents();
  }

  @Get('companies')
  @Roles(Role.ADMIN)
  async getAllCompanies() {
    return this.usersService.getAllCompanies();
  }

  @Get('company-users')
  @Roles(Role.ADMIN, Role.COMPANY_ROOT)
  async getAllCompanyUsers(@Req() req) {
    return this.usersService.getAllCompanyUsers(req.user);
  }

  @Get('admins')
  @Roles(Role.ADMIN)
  async getAllAdmin() {
    return this.usersService.getAllAdmins();
  }
}
