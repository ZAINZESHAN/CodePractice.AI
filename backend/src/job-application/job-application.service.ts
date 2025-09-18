import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from '@prisma/client';

@Injectable()
export class JobApplicationService {
  constructor(private prisma: PrismaService) {}

  // STUDENT: Apply for a job
  async applyJob(
    studentId: number,
    dto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new ForbiddenException('Job not found');

    await this.prisma.user.update({
      where: { id: studentId },
      data: { resumeUrl: dto.resumeUrl },
    });

    return this.prisma.jobApplication.create({
      data: {
        jobId: dto.jobId,
        phoneNumber: dto.phoneNumber,
        resumeUrl: dto.resumeUrl,
        studentId,
      },
    });
  }

  // STUDENT: Get my applications
  async getMyApplications(studentId: number): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany({
      where: { studentId },
      include: {
        job: {
          select: { id: true, title: true, company: true, location: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // COMPANY: Get all applicants
  async getAllApplicants(companyId: number) {
    return this.prisma.jobApplication.findMany({
      where: { job: { companyId } },
      include: {
        student: {
          select: { id: true, name: true, email: true, resumeUrl: true },
        },
        job: { select: { id: true, title: true, location: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // // COMPANY: Get applicants for a specific job
  // async getApplicants(
  //   companyId: number,
  //   jobId: number,
  // ): Promise<JobApplication[]> {
  //   const job = await this.prisma.job.findUnique({ where: { id: jobId } });
  //   if (!job || job.companyId !== companyId)
  //     throw new ForbiddenException('Not authorized');

  //   return this.prisma.jobApplication.findMany({
  //     where: { jobId },
  //     include: { student: true },
  //   });
  // }

  // COMPANY: Update applicant status
  async updateStatus(
    companyId: number,
    appId: number,
    dto: UpdateJobApplicationDto,
  ) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: appId },
      include: { job: true },
    });
    if (!app || app.job.companyId !== companyId)
      throw new ForbiddenException('Not authorized');

    return this.prisma.jobApplication.update({
      where: { id: appId },
      data: { status: dto.status },
    });
  }

  // COMPANY: Delete applicant
  async deleteApplicant(companyId: number, appId: number) {
    const app = await this.prisma.jobApplication.findUnique({
      where: { id: appId },
      include: { job: true },
    });
    if (!app || app.job.companyId !== companyId)
      throw new ForbiddenException('Not authorized');

    return this.prisma.jobApplication.delete({
      where: { id: appId },
    });
  }
}
