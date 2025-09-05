import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCompanyStatusDto } from './dto/update-company-status.dto';
import { CompanyStatus } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  // Company create (public endpoint)
  async createCompany(dto: CreateCompanyDto): Promise<any> {
    return this.prisma.company.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: CompanyStatus.PENDING, // ✅ type-safe
      },
    });
  }

  // Get all companies (admin use case)
  async findAll() {
    return this.prisma.company.findMany();
  }

  // Get one company by ID
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
  async updateStatus(id: number, dto: UpdateCompanyStatusDto) {
    return this.prisma.company.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  // Delete company
  async remove(id: number) {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
