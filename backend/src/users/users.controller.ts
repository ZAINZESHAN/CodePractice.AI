import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/guards/roles.guards';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { Request } from 'express';
import { UserEntity } from './entities/user.entity';

interface AuthRequest extends Request {
  user: UserEntity;
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // JWT + Roles guard applied globally
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Only admin can fetch all users
  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Admin + Company Root can fetch students
  @Get('students')
  @Roles(Role.ADMIN, Role.COMPANY_ROOT)
  async getAllStudents() {
    return this.usersService.getAllStudents();
  }

  // Only Admin can fetch companies
  @Get('companies')
  @Roles(Role.ADMIN)
  async getAllCompanies() {
    return this.usersService.getAllCompanies();
  }

  // Admin can fetch all company users
  @Get('company-users')
  @Roles(Role.ADMIN, Role.COMPANY_ROOT)
  async getAllCompanyUsers(@Req() req: AuthRequest) {
    return this.usersService.getAllCompanyUsers(req.user);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.COMPANY_ROOT)
  async deleteCompanyUser(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.usersService.deleteCompanyUser(Number(id), req.user);
  }

}
