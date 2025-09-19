import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  // Create company
  async createCompany(dto: CreateCompanyDto, rootId: number) {
    return this.prisma.company.create({
      data: {
        name: dto.name,
        description: dto.description,
        rootId,
      },
    });
  }

  async remove(id: number) {
    // 1. Delete all job applications of this company's jobs
    const jobs = await this.prisma.job.findMany({ where: { companyId: id } });
    const jobIds = jobs.map((j) => j.id);
    if (jobIds.length > 0) {
      await this.prisma.jobApplication.deleteMany({
        where: { jobId: { in: jobIds } },
      });
    }

    // 2. Delete all jobs of this company
    await this.prisma.job.deleteMany({ where: { companyId: id } });

    // 3. Delete all users of this company
    await this.prisma.user.deleteMany({
      where: { companyId: id },
    });

    // 4. Delete the company itself
    return this.prisma.company.delete({ where: { id } });
  }
}
