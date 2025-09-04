import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyCompany(@Req() req: { user: { id: number } }) {
    const userId = req.user.id;
    return this.companyService.getMyCompany(userId);
  }
}
