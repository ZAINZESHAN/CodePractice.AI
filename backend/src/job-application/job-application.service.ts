import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from '@prisma/client';

@Injectable()
export class JobApplicationService {
  constructor(private prisma: PrismaService) {}

  // student apply for job
  async applyJob(
    studentId: number,
    dto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new ForbiddenException('Job not found');

    return this.prisma.jobApplication.create({
      data: {
        jobId: dto.jobId,
        studentId,
      },
    });
  }

  // student get all applied jobs
  async getMyApplications(studentId: number): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: { studentId },
      include: { job: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // company get all applicants for a job
  async getApplicants(
    companyId: number,
    jobId: number,
  ): Promise<JobApplication[]> {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.companyId !== companyId) {
      throw new ForbiddenException('Not authorized');
    }

    return this.prisma.jobApplication.findMany({
      where: { jobId },
      include: { student: true },
    });
  }

  // company update status
  async updateStatus(
    companyId: number,
    appId: number,
    dto: UpdateJobApplicationDto,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: appId },
      include: { job: true },
    });
    if (!app || app.job.companyId !== companyId) {
      throw new ForbiddenException('Not authorized');
    }

    return this.prisma.jobApplication.update({
      where: { id: appId },
      data: { status: dto.status },
    });
  }
}
