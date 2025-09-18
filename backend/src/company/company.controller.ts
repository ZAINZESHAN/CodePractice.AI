import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // Public: Request to create a company
  @Post()
  create(
    @Param('id', ParseIntPipe) rootId: number,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companyService.createCompany(dto, rootId);
  }

  // Admin only: Delete company
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.remove(id);
  }
}
