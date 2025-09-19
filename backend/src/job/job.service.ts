import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from '@prisma/client';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  // create a job
  async createJob(userId: number, dto: CreateJobDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, companyId: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.companyId) {
        throw new ForbiddenException('User is not linked to any company');
      }

      const company = await this.prisma.company.findUnique({
        where: { id: user.companyId },
      });
      if (!company) {
        throw new NotFoundException('Company not found');
      }

      const job = await this.prisma.job.create({
        data: {
          title: dto.title,
          description: dto.description,
          salary: dto.salary,
          location: dto.location ?? null,
          companyId: company.id,
        },
      });

      return job;
    } catch (err) {
      if (err instanceof HttpException) throw err;

      throw new HttpException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        err?.message || 'Something went wrong while creating job',
        500,
      );
    }
  }

  // get all company jobs compnay root
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
    } catch (err) {
      console.error('Job error:', err);
      throw new HttpException('Something went wrong', 500);
    }
  }

  // get all jobs for admin
  async listAllJobs(): Promise<Job[]> {
    try {
      return this.prisma.job.findMany({
        where: {},
        orderBy: { createdAt: 'desc' },
        include: { company: true },
      });
    } catch (error) {
      console.error('Job error:', error);
      throw new HttpException('Something went wrong while fetching jobs', 500);
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
          salary: dto.salary,
          location: dto.location,
        },
      });
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }

  // delete job
  async deleteJobById(jobId: number): Promise<Job> {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id: jobId },
      });
      if (!job) throw new NotFoundException('Job not found');
      console.log(job);
      return this.prisma.job.delete({
        where: { id: job.id },
      });
    } catch {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async filterJobs(interest?: string, location?: string): Promise<any[]> {
    console.log('Filter API called with:', { interest, location });

    try {
      const orConditions: any[] = [];

      if (interest && interest.trim() !== '') {
        orConditions.push({
          OR: [
            { title: { equals: interest, mode: 'insensitive' } },
            { title: { contains: interest, mode: 'insensitive' } },
          ],
        });
      }

      if (location && location.trim() !== '') {
        orConditions.push({
          location: { contains: location, mode: 'insensitive' },
        });
      }

      // Jobs that match interest/location
      const matchedJobs = await this.prisma.job.findMany({
        where: orConditions.length > 0 ? { OR: orConditions } : {},
        include: { company: true },
        orderBy: { createdAt: 'desc' },
      });

      // Jobs that do NOT match (backup list)
      const nonMatchedJobs = await this.prisma.job.findMany({
        where: orConditions.length > 0 ? { NOT: { AND: orConditions } } : {},
        include: { company: true },
        orderBy: { createdAt: 'desc' },
      });

      // Sorting → Exact interest match first
      if (interest && interest.trim() !== '') {
        matchedJobs.sort((a, b) => {
          if (a.title.toLowerCase() === interest.toLowerCase()) return -1;
          if (b.title.toLowerCase() === interest.toLowerCase()) return 1;
          return 0;
        });
      }

      // Merge matched + non-matched
      let jobsToShow = [...matchedJobs, ...nonMatchedJobs];

      // Remove duplicates based on job.id
      jobsToShow = jobsToShow.filter(
        (job, index, self) => index === self.findIndex((j) => j.id === job.id),
      );

      // Slice top 5
      jobsToShow = jobsToShow.slice(0, 5);
      return jobsToShow;
    } catch (error) {
      console.error('❌ Job filter error:', error || error);
      throw new HttpException('Something went wrong while filtering jobs', 500);
    }
  }
}
