import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RolesGuard } from "src/common/guards/roles.guards";
import { Role } from "@prisma/client";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

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
    async getAllCompanyUsers() {
        return this.usersService.getAllCompanyUsers();
    }

    @Get('admins')
    @Roles(Role.ADMIN)
    async getAllAdmin() {
        return this.usersService.getAllAdmins();
    }

}
