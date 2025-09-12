import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  // Create company (by root user, goes to pending)
  async createCompany(dto: CreateCompanyDto, rootId: number) {
    return this.prisma.company.create({
      data: {
        name: dto.name,
        description: dto.description,
        rootId, // ✅ root user becomes owner
      },
    });
  }

  // Get all companies (admin)
  async findAll() {
    return this.prisma.company.findMany({
      where: { },
    });
  }

  // Get company by ID
  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { users: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  // Update company details
  async update(id: number, dto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: dto,
    });
  }

  // Update company status (Admin only)
  async updateStatus(id: number, dto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');

    return this.prisma.company.update({
      where: { id },
      data: dto
    });
  }

  // Delete company
  async remove(id: number) {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
