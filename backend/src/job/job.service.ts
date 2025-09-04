import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(userId: number, dto: CreateJobDto): Promise<Job> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { company: true },
      });

      if (!user?.company) {
        throw new ForbiddenException('Company not found');
      }

      const job = await this.prisma.job.create({
        data: {
          title: dto.title,
          description: dto.description,
          location: dto.location,
          companyId: user.company.id,
        },
      });
      return job;
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }

  // async listJobs(userId: number) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id: userId },
  //     include: { company: true },
  //   });

  //   if (!user?.company) {
  //     throw new ForbiddenException('Company not found');
  //   }

  //   return [];

  //   return this.prisma.job.findMany({
  //     where: { companyId: user.company.id },
  //     orderBy: { createdAt: 'desc' },
  //   });
  // }
  // }
}
