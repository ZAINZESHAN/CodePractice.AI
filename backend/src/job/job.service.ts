import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from '@prisma/client';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  // create a job
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

  // get all company jobs
  async listJobs(userId: number): Promise<Job[]> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { company: true },
      });
      if (!user?.company) throw new ForbiddenException('Company not found');

      return this.prisma.job.findMany({
        where: { companyId: user.company.id },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }

  // get job by id
  async getJobById(userId: number, jobId: number): Promise<Job> {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id: jobId },
      });
      if (!job) throw new ForbiddenException('Job not found');

      // check if the job belongs to the user's company
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new ForbiddenException('User not found');
      }
      if (job.companyId !== user.companyId)
        throw new ForbiddenException('Not Authorized');
      return job;
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }

  // update job
  async updateJobById(
    userId: number,
    jobId: number,
    dto: UpdateJobDto,
  ): Promise<Job> {
    try {
      const job = await this.getJobById(userId, jobId);
      return this.prisma.job.update({
        where: { id: job.id },
        data: {
          title: dto.title,
          description: dto.description,
          location: dto.location,
        },
      });
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }

  // delete job
  async deleteJobById(userId: number, jobId: number): Promise<Job> {
    try {
      const job = await this.getJobById(userId, jobId);
      return this.prisma.job.delete({
        where: { id: job.id },
      });
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }
}
